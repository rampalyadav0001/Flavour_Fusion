import { Category } from "../models/category.model.js";
import { Food } from "../models/food.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"
const createFood = asyncHandler(async(req,res) => {
    const { Name, CategoryName, Unit_Price, Avail, Description, Food_Type } = req.body;

    if([Name, CategoryName, Unit_Price, Avail, Description, Food_Type].some((field) => field?.trim( ) === '')){
        throw new ApiError(400, "All fields are required");
    }

    const category = await Category.findOne({ Name: CategoryName });
    if (!category) {
        throw new ApiError(400, "Category not found");
    }

    if (!req.files || !req.files.image || req.files.image.length === 0) {
        throw new ApiError(400, "Image file is required");
    }
    
    const imageLocalPath = req.files.image[0].path;
    
    const img = await uploadOnCloudinary(imageLocalPath);
    
    const food = await Food.create({
        Name, 
        CategoryName: category._id,  
        Unit_Price, 
        Avail, 
        image: img.url,
        Description, 
        Food_Type
    });
    

    const createdFood = await Food.findById(food._id);

    if (!createdFood) {
        throw new ApiError(500, "Something went wrong while listing Food");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdFood, "Food successfully registered"));
});


const getAllFoods = asyncHandler(async(req,res)=>{
    const foods = await Food.find();
    return res
    .status(200)
    .json(new ApiResponse(200, foods, "Food data fetched"))

});

const getFoodsByCategory = asyncHandler(async (req, res) => {
    const { category, pureVeg } = req.query;

    // If pureVeg is 'true', set foodType to 'Veg'
    const foodType = pureVeg === 'true' ? 'Veg' : undefined;

    // Create a query object
    let query = {};
    if (foodType) {
        query.Food_Type = foodType;
    }

    // If a category is provided, find the category and add it to the query
    if (category) {
        const categoryData = await Category.findOne({ Name: category });
        if (categoryData) {
            query.CategoryName = categoryData._id;
        }
    }

    // Find food items that match the query
    const foodItems = await Food.find(query);

    res.status(200).json(new ApiResponse(200, foodItems, "Data fetched"));
});









export {createFood,
        getAllFoods,
        getFoodsByCategory
}
