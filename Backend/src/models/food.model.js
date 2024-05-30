import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
      },
      CategoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      Unit_Price: {
        type: Number,
        required: true
      },
      Avail:{
        type: Boolean,
        default:true
      },

      image:{
        type:String,
        required: true

      },

      Description: {
        type: String,
        required: true
        },

      Food_Type:{
        type: String,
        required: true,
        enum: ['Veg','Non-Veg']
        },
});

export const Food = mongoose.model('Food', FoodSchema);

