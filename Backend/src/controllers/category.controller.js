import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createCategory = asyncHandler(async(req,res) => {
    const { Name } = req.body;

    if( Name?.trim( ) === ''){
        throw new ApiError(400, "Name required");
    }

    const existedName = await Category.findOne({Name });
    if (existedName) {
        throw new ApiError(409, "Name already exists");
    }

    if (!req.files || !req.files.image || req.files.image.length === 0) {
        throw new ApiError(400, "Image file is required");
    }
    
    const imageLocalPath = req.files.image[0].path;
    
    const img = await uploadOnCloudinary(imageLocalPath);
    
    const category = await Category.create({
        Name, 
        image: img.url,
    });
    

    const createdCategory = await Category.findById(category._id);

    if (!createdCategory) {
        throw new ApiError(500, "Something went wrong while listing Category");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdCategory, "Category successfully registered"));
});

const getAllCategory = asyncHandler(async(req,res)=>{
    const categories = await Category.find();
    return res
    .status(200)
    .json(new ApiResponse(200, categories, "Category data fetched"))

});

export {createCategory,
        getAllCategory
}
