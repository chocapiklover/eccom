import { Request, Response } from 'express';
import Stripe from 'stripe';
import Cart from '../models/Cart';
import Order from '../models/Order';
import dotenv from 'dotenv';
import Product, { IProduct } from '../models/Product';
import User, { IUser } from '../models/User';
import mongoose, { UpdateQuery } from 'mongoose';

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
        await createOrderAndClearCart(session.client_reference_id!, session.id, session.shipping_details);
        break;
      default:
        console.log(`❌ Unhandled event type ${event.type}`);
    }
  
    res.json({ received: true });
  };
  
  // Create an order and clear the cart
  const createOrderAndClearCart = async (userId: string, sessionId: string, address: Stripe.Checkout.Session.ShippingDetails | null) => {
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
  
      // Map cart items to order items
      const orderItems = cart.cartItems.map(item => ({
        product: item.product._id,
        productName: item.product.name, // Include the product name
        quantity: item.quantity,
        price: item.product.price,
        size: item.size,
      }));
  
      if (address) {
        await User.findByIdAndUpdate(userId, {
          shippingAddress: {
            line1: address.address?.line1 ?? '',
            line2: address.address?.line2 ?? '',
            city: address.address?.city ?? '',
            state: address.address?.state ?? '',
            postal_code: address.address?.postal_code ?? '',
            country: address.address?.country ?? '',
          },
        });
      }
  
      // Use the total amount from the Stripe session
      const totalPrice = session.amount_total! / 100; // Stripe amount is in cents
  
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
        address: {
          line1: address?.address?.line1 ?? '',
          city: address?.address?.city ?? '',
          country: address?.address?.country ?? '',
          postal_code: address?.address?.postal_code ?? '',
          state: address?.address?.state ?? '',
        },
      });
  
      // Save the order to the database
      const savedOrder = await order.save();
  
      // Update stock quantities
      for (const item of cart.cartItems) {
        const product = await Product.findById(item.product._id) as IProduct | null;
        if (product) {
          const sizeStockItem = product.sizeStock.find(sizeItem => sizeItem.size === item.size);
          if (sizeStockItem) {
            sizeStockItem.stockQuantity -= item.quantity;
            await product.save();
          }
        }
      }
  
      // Clear the cart for the user
      await Cart.findOneAndUpdate({ user: userId }, { cartItems: [] }, { new: true });
  
      // Update the user's order history and shipping address
      const userUpdateData: UpdateQuery<IUser> = {
        $push: { orderHistory: savedOrder._id },
      };
      if (address) {
        userUpdateData.shippingAddress = {
          line1: address?.address?.line1 ?? '',
          line2: address?.address?.line2 ?? '',
          city: address?.address?.city ?? '',
          state: address?.address?.state ?? '',
          postal_code: address?.address?.postal_code ?? '',
          country: address?.address?.country ?? '',
        };
      }
      await User.findByIdAndUpdate(userId, userUpdateData);
  
      console.log('Order created, cart cleared, and user updated');
    } catch (error) {
      console.error('Failed to create order and clear cart:', error);
    }
  };