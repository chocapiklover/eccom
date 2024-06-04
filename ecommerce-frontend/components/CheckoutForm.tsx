import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from '../utils/axios';
import { useCartStore } from '../context/useCartStore';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, clearCart } = useCartStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure Stripe and Elements are loaded
    if (!stripe || !elements) {
      setError('Stripe has not loaded');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('CardElement is not found');
      setLoading(false);
      return;
    }

    try {
      // Create a payment intent on the server
      const { data } = await axios.post('/api/payment/create-payment-intent', {
        items: items.map(item => ({ id: item.product._id, quantity: item.quantity })),
      });

      const { clientSecret } = data;

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
            address: {
              line1: address,
            },
          },
        },
      });

      // Handle errors from Stripe
      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setLoading(false);
        return;
      }

      // Handle successful payment
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Save order to the database
        await axios.post('/api/orders', {
          email,
          name,
          address,
          items,
        });

        // Clear the cart
        clearCart();

        alert('Payment succeeded!');
      }
    } catch (err) {
      setError('Payment processing failed');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Card Details</label>
        <CardElement />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;