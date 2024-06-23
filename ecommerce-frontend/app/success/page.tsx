//ecommerce-frontend/app/success/page.tsx
'use client'

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from '../../utils/axios';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [sessionDetails, setSessionDetails] = useState<{
    id: string;
    customer_email: string | null;
    amount_total: number | null;
    currency: string | null;
    payment_status: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const { data } = await axios.get(`/checkout/checkout-session?session_id=${sessionId}`);
        setSessionDetails(data);
      } catch (error) {
        console.error('Failed to retrieve session details', error);
      }
    };

    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId]);

  if (!sessionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
        <p className="mb-2">Thank you for your purchase!</p>
        <div className="mb-4">
          <strong>Payment Status:</strong> {sessionDetails.payment_status}
        </div>
        <div className="mb-4">
          <strong>Customer Email:</strong> {sessionDetails.customer_email}
        </div>
        <div className="mb-4">
          <strong>Amount Paid:</strong> {(sessionDetails.amount_total! / 100).toFixed(2)} {sessionDetails.currency?.toUpperCase()}
        </div>
        <a href="/" className="text-pink-500 hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

const SuspendedSuccessPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SuccessPage />
  </Suspense>
);

export default SuspendedSuccessPage;