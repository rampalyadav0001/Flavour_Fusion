import { asyncHandler } from "../utils/asyncHandler.js";
import Order from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createOrUpdateOrder = asyncHandler(async(req, res) => {
    const customerId = req.user?._id;
    const { Cart_ID, Table_no, TakeAway, Bill, Gst, Bag, Donate } = req.body;

    if ([Cart_ID, Table_no, TakeAway, Bill, Gst, Bag, Donate].some((field) => typeof field === 'string' && field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    

    let bag = 0;
    let donate = 0;

    if (Bag) {
        bag = 6;
    }
    if (Donate) {
        donate = 6;
    }

    const finalAmount = Bill + Gst + bag + donate;

    let order = await Order.findOne({ Customer_ID: customerId });
    if (!order) {
        order = new Order({
            Customer_ID: customerId,
            Cart_ID: Cart_ID,
            Table_no: Table_no,
            TakeAway: TakeAway,
            Bill: Bill,
            Gst: Gst,
            Bag: Bag,
            Donate: Donate,
            Total_Bill: finalAmount
        });
    } else {
        order.Cart_ID = Cart_ID;
        order.Table_no = Table_no;
        order.TakeAway = TakeAway;
        order.Bill = Bill;
        order.Gst = Gst;
        order.Bag = Bag;
        order.Donate = Donate;
        order.Total_Bill = finalAmount;
    }

    // Save the order
    await order.save();

    return res
      .status(201)
      .json(new ApiResponse(200, order, "Order Generated"));
});

export { createOrUpdateOrder };
