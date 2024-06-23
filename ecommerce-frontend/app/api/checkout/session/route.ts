import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

// Function to handle the GET request
export async function GET(req: NextRequest) {
  // Extract the session ID from the query parameters
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  try {
    // Check if session_id is valid
    if (session_id) {
      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'customer'],
      });
      // Return the session data as JSON
      return NextResponse.json(session, { status: 200 });
    } else {
      // Return an error response if the session_id is invalid
      return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
    }
  } catch (error: any) {
    // Handle any errors that occur during the session retrieval
    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
