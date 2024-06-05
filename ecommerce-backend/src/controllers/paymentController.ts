import { Request, Response } from 'express';
import Stripe from 'stripe';
import Cart from '../models/Cart';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

// Controller to create a payment intent
// Create checkout session
export const createCheckoutSession = async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.body;
  
    try {
      const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
      
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.cartItems.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.product.name,
              images: [item.product.images[0]],
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
      });
  
      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create checkout session', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };