import Razorpay from "razorpay";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import OrdMdl from "../models/order.model.js"
import { ApiError } from "../utils/ApiError.js";

const instance = new Razorpay({
    key_id: process.env.RP_ID,
    key_secret: process.env.RP_KEY,
});

const createPayOrder= asyncHandler(async(req, res)=>{
    const {orderId}=req.body;
    const ord= await OrdMdl.findById(orderId);
    if(!ord){
        throw new ApiError(404,
            "Order not found",
        );

    }
    const amount=ord.Total_Bill*100;
    

    const options = {
        amount: amount, // Amount in paise (20.5 INR)
        currency: 'INR',
        receipt: orderId, // Your custom receipt ID
    };

    const order = await instance.orders.create(options);
    return res
      .status(201)
      .json(new ApiResponse(200, order, "Order Generated"));
});

const verifyPayment= asyncHandler(async(req, res)=>{

    return res
      .status(201)
      .json(new ApiResponse(200, true, "Payment Successful "));
});

const getKey= ((req, res)=>{

    return res
      .status(200)
      .json(new ApiResponse(200, dbscpFrBGa17cLi7AkvYM9hb, "key send"));
});


export {createPayOrder, verifyPayment, getKey}

