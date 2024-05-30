import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
      },
      image: {
        type: String,
        required: true
      }
});

export const Category = mongoose.model('Category', CategorySchema);
