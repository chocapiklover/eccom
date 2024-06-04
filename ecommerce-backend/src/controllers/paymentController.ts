import { Request, Response } from 'express';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

// Controller to create a payment intent
export const createPaymentIntent = async (req: Request, res: Response) => {
  const { items } = req.body;

  // Function to calculate order amount based on items
  const calculateOrderAmount = (items: any[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to cents
  };

  try {
    // Create a payment intent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'eur',
    });

    // Send the client secret of the payment intent to the client
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message }); // Send error message to the client
    } else {
      res.status(500).send({ error: 'An unknown error occurred' });
    }
  }
};
