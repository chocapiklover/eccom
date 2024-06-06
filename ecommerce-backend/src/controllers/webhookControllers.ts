import { Request, Response } from 'express';
import Stripe from 'stripe';
import Cart from '../models/Cart';
import Order from '../models/Order';
import dotenv from 'dotenv';

dotenv.config();


// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

// Handle Stripe webhook events
export const handleStripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
  
    let event;
  
    try {
      // Verify the event with Stripe using the raw body
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET! // Use your webhook secret here
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`⚠️  Webhook signature verification failed.`, message);
      return res.sendStatus(400); // Respond with a 400 error if the signature is invalid
    }
  
    console.log(`🔔 Event received: ${event.type}`);
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`💰 Payment received for session: ${session.id}`);
        await createOrderAndClearCart(session.client_reference_id!, session.id);
        break;
      default:
        console.log(`❌ Unhandled event type ${event.type}`);
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
  
      // Retrieve the Stripe session
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
      });
  
      if (!session) {
        throw new Error('Stripe session not found');
      }
  
      // Check if amount_total is not null
      if (session.amount_total === null) {
        throw new Error('Amount total is null');
      }
  
      // Map cart items to order items
      const orderItems = cart.cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        size: item.size,
      }));
  
      // Use the total amount from the Stripe session
      const totalPrice = session.amount_total / 100; // Stripe amount is in cents
  
      // Create a new order
      const order = new Order({
        user: userId,
        orderItems,
        totalPrice,
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
          id: session.payment_intent,
          status: session.payment_status,
          update_time: new Date(session.created * 1000).toISOString(),
          email_address: session.customer_details?.email,
        },
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
  