import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Define the route for creating a payment intent
router.post('/create-checkout-session', protect, createCheckoutSession);

export default router;