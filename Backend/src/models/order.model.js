import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    Customer_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      Cart_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
      },

      Table_no: {
        type: Number,
      },

      TakeAway:{
        type: Boolean
      },

      Bill: {
        type: Number,
        required: true
      },

      Gst: {
        type: Number,
        required: true
      },
      Bag:{
        type: Boolean,
        default: false
      },
      Donate:{
        type: Boolean,
        default: false
      },
      Total_Bill: {
        type: Number,
        required: true
      }
      
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;