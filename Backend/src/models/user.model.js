import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    FName: {
        type: String,
        required: [true, 'First name is required']
    },
    LName: {
        type: String,
        required: [true, 'Last name is required']
    },
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], // Add your regex
    },
    phone_no : {
        type: Number,
        required: [true, 'Phone number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    avatar: {
        type: String,
        
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    refreshToken:{
        type: String
    }
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        FName: this.FName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
         _id: this._id,
         email: this.email, 
         username: this.username,
         FName: this.FName
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
     }
     )
 }
 export const User = mongoose.model('User', userSchema);
