import { Router } from "express";
import { createOrUpdateOrder } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/create-order").post( verifyJWT, createOrUpdateOrder)

export default router;
