import { Router } from "express";
import { createCategory, getAllCategory  } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";



const router = Router();

router.route("/list-category").post(upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]),createCategory)

router.get('/categories', getAllCategory );

export default router;