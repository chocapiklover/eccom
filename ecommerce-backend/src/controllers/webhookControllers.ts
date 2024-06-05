import { Request, Response } from 'express';
import Stripe from 'stripe';
import Cart from '../models/Cart';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;

      // Fulfill the purchase...
      await clearCart(session.client_reference_id!);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

const clearCart = async (userId: string) => {
  try {
    await Cart.findOneAndUpdate(
      { user: userId },
      { cartItems: [] },
      { new: true }
    );
    console.log('Cart cleared');
  } catch (error) {
    console.error('Failed to clear cart:', error);
  }
};