import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';
import { getSessionDetails } from '../controllers/paymentController';


const router = express.Router();

// Define the route for creating a payment intent
router.post('/create-checkout-session', protect, createCheckoutSession);
router.get('/checkout-session', protect, getSessionDetails);

export default router;