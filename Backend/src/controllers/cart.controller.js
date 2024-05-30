import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Food } from "../models/food.model.js";

const createOrUpdateCart = asyncHandler(async (req, res) => {
  const customerId = req.user?._id;
  const { Order_id, quantity } = req.body;

  if(!Order_id || !quantity){
      throw new ApiError(400, "Please provide all the required fields");
  }

  // Find existing cart or create a new one
  let cart = await Cart.findOne({ Customer_ID: customerId });
  if (!cart) {
    cart = new Cart({ Customer_ID: customerId, Order_Item: [] });
  }

  // Update or create order item
  const existingOrderItem = cart.Order_Item.find(item => item.order.equals(Order_id));
  const food = await Food.findOne({ _id: Order_id });
  if (existingOrderItem) {
    existingOrderItem.quantity += quantity;
    existingOrderItem.totalAmmount += food.Unit_Price * quantity;
  } else {
    cart.Order_Item.push({
      order: Order_id,
      name: food.Name,
      quantity,
      thumbnail: food.image, 
      totalAmmount: food.Unit_Price * quantity,
    });
  }

  // Calculate the bill
  cart.Bill = cart.Order_Item.reduce((total, item) => total + item.totalAmmount, 0);

  // Save the cart
  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart"));
});


const getCartById = asyncHandler( async(req, res) => {
    const customerId = req.user?._id;
    if(!customerId){
        throw new ApiError(400, "Please Sign Up");
    }
    const cart = await Cart.findOne({ Customer_ID: customerId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
        }
        return res
        .status(200)
        .json(new ApiResponse(200, cart, "Cart found"));
        
});

// Controller
const deleteCartItem = asyncHandler(async (req, res) => {
  const customerId = req.user?._id;
  const { food_id } = req.body;

  if(!food_id){
      throw new ApiError(400, "Please provide all the required fields");
  }

  // Find existing cart
  let cart = await Cart.findOne({ Customer_ID: customerId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // Find the order item to be deleted
  const orderItemIndex = cart.Order_Item.findIndex(item => item.order.equals(food_id));
  if (orderItemIndex === -1) {
    throw new ApiError(404, "Order item not found in the cart");
  }

  // Remove the order item from the cart
  cart.Order_Item.splice(orderItemIndex, 1);

  // Recalculate the overall bill
  cart.Bill = cart.Order_Item.reduce((total, item) => total + item.totalAmmount, 0);

  // Save the updated cart
  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item removed from cart"));
});

const deleteCart = asyncHandler(async (req, res) => {
  const customerId = req.user?._id;

  // Find existing cart
  let cart = await Cart.findOne({ Customer_ID: customerId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // Delete the cart
  await Cart.deleteOne({ Customer_ID: customerId });

  return res
    .status(200)
    .json(new ApiResponse(200, "Cart deleted successfully"));
});




export { createOrUpdateCart,
         getCartById,
         deleteCartItem,
         deleteCart
        };

