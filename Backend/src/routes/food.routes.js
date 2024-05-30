import { Router } from "express";
import { createFood, getAllFoods, getFoodsByCategory } from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router()

router.route("/list-food").post(upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]),createFood)

router.get('/foods', getAllFoods);

router.get('/filter-food', getFoodsByCategory);



export default router;