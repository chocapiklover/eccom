import { Request, Response } from 'express';
import Stripe from 'stripe';
import Cart from '../models/Cart';
import Order from '../models/Order';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

// Handle Stripe webhook events
export const handleStripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
  
    let event;
  
    try {
      // Verify the event with Stripe
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
  
        // Fulfill the purchase by creating an order and clearing the cart
        await createOrderAndClearCart(session.client_reference_id!, session.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    res.json({ received: true });
  };
  
  // Create an order and clear the cart
  const createOrderAndClearCart = async (userId: string, sessionId: string) => {
    try {
      // Find the cart for the user
      const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
  
      if (!cart) {
        throw new Error('Cart not found');
      }
  
      // Map cart items to order items
      const orderItems = cart.cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        size: item.size,
      }));
  
      // Calculate the total price
      const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Create a new order
      const order = new Order({
        user: userId,
        orderItems,
        totalPrice,
        isPaid: true,
        paidAt: new Date(),
      });
  
      // Save the order to the database
      await order.save();
  
      // Clear the cart for the user
      await Cart.findOneAndUpdate({ user: userId }, { cartItems: [] }, { new: true });
  
      console.log('Order created and cart cleared');
    } catch (error) {
      console.error('Failed to create order and clear cart:', error);
    }
  };