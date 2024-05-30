import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  CostumerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  OrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  PaymentDate: {
    type: Date,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Paid', 'Pending', 'Failed'] // Assuming these are the possible statuses
  }
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;
