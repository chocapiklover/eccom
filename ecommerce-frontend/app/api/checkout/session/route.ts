import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
    const { session_id } = req.query;
  
    try {
      if (typeof session_id === 'string') {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
          expand: ['line_items', 'customer'],
        });
        res.status(200).json(session);
      } else {
        res.status(400).json({ error: 'Invalid session ID' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  };
  
  export { getSession as GET };