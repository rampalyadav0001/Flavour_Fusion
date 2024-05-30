
import { Router } from 'express'; 
import Razorpay from 'razorpay';
import { createPayOrder, getKey, verifyPayment } from '../controllers/payment.controller.js';

const router = Router();
const instance = new Razorpay({
    key_id: process.env.RP_ID,
    key_secret: process.env.RP_KEY,
});

// Create an order route
router.route('/create-order').post(createPayOrder);

router.route('/verifyPayment').post(verifyPayment);

router.route('/get-key').get(getKey);


export default router;
