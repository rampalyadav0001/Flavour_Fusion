import { Router } from "express";
import { createOrUpdateCart, deleteCart, deleteCartItem, getCartById } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/add-to-cart").post(verifyJWT, createOrUpdateCart);

router.route("/get-cart").get(verifyJWT, getCartById);


router.route('/remove-item').delete(verifyJWT, deleteCartItem);

router.route('/delete-cart').delete(verifyJWT, deleteCart);


export default router;