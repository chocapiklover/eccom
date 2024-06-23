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

// Function to create a checkout session
export const createCheckoutSession = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.body; // Get the userId from the request body

  try {
    // Find the cart for the user and populate the product details
    const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
    
    if (!cart) {
      // If cart is not found, return a 404 error
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Specify the payment methods
      line_items: cart.cartItems.map((item) => ({
        price_data: {
          currency: 'usd', // Specify the currency
          product_data: {
            name: item.product.name, // Get the product name
            images: [item.product.images[0]], // Get the first product image
          },
          unit_amount: item.product.price * 100, // Convert price to cents
        },
        quantity: item.quantity, // Specify the quantity
      })),
      mode: 'payment', // Set the mode to payment
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // Set the success URL
      cancel_url: `${process.env.CLIENT_URL}/`, // Set the cancel URL
      client_reference_id: userId, // Add this line to include the user ID
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Add allowed countries for shipping
      },
    });

    // Return the session URL to the client
    res.status(200).json({ url: session.url });
  } catch (error) {
    // Handle errors and return a 500 status code with error message
    console.error(error);
    res.status(500).json({ message: 'Failed to create checkout session', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Function to get session details
export const getSessionDetails = async (req: Request, res: Response) => {
  const { session_id } = req.query;

  try {
    if (typeof session_id === 'string') {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'customer'],
      });

      res.status(200).json({
        id: session.id,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        shipping_details: session.shipping_details, // Include shipping details
      });
    } else {
      res.status(400).json({ error: 'Invalid session ID' });
    }
  } catch (error) {
    console.error("Error retrieving session:", error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};