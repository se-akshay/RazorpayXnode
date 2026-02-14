const { razorpayInstance } = require('../config/razorpay.config');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();
const razorpay = razorpayInstance();

export const createOrder = async(req, res) => {
    const {courseId,amount} = req.body;
    const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `order_${Date.now()}`,
    };
    try {
        razorpay.orders.create(options, (err, order) => {
            if(err){
                return res.status(500).json({message: 'Error creating order'});
            }
            res.status(200).json({order});
        });
    } catch (error) {
        success: false,
        res.status(500).json({message: error.message});
    }
}

export const verifyPayment = async(req, res) => {
    const {orderId, paymentId, signature} = req.body;
    // Genrerated signature = orderId + hmacobject + paymentId
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(orderId + '|' + paymentId);
    const generated_signature = hmac.digest('hex');
    if(generated_signature !== signature){
        return res.status(400).json({message: 'Invalid signature'});
    }
    res.status(200).json({message: 'Payment verified successfully'});
    
}