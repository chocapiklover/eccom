/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useCartStore } from '../context/useCartStore';
import { useRouter } from 'next/navigation';
import axios from '../utils/axios';

// Define the props interface
interface CartProps {
  userId: string;
}

const Cart: React.FC<CartProps> = ({ userId }) => {
  const items = useCartStore(state => state.items); // Access the cart items from Zustand store
  const removeItem = useCartStore(state => state.removeItem); // Access removeItem function
  const fetchCart = useCartStore(state => state.fetchCart); // Access fetchCart function
  const router = useRouter(); // Get the router object for navigation

  // Fetch cart items when the component mounts or when userId changes
  React.useEffect(() => {
    const fetchCartItems = async () => {
      try {
        await fetchCart(userId);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId, fetchCart]);

  // Handle the checkout process
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('/checkout/create-checkout-session', { userId });
      router.push(data.url); // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="p-4 sm:w-96 h-full bg-gray-200">
      {/* Cart header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">Your cart - {items.length} item{items.length !== 1 && 's'}</h2>
      </div>
      {/* Conditional rendering for empty cart */}
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {/* List each cart item */}
          {items.map(item => (
            <li key={`${item.product._id}-${item.size}`} className="mb-4 border-b pb-4 flex justify-between">
              <div className="flex items-center">
                <img
                  src={item.product.images?.[0]} 
                  alt={item.product.name}
                  className="w-16 h-16 object-contain  mr-4"
                />
                <div>
                  <span className="block text-lg font-semibold">{item.product.name}</span>
                  <span className="block text-gray-600">${item.product.price}</span>
                  <span className="block text-gray-600">Size: {item.size}</span> {/* Display size */}
                  <span className="block text-gray-600">Quantity: {item.quantity}</span>
                  <button
                    onClick={() => removeItem(item.product._id, item.size)}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <span className="text-lg font-semibold">${item.product.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
      {/* Cart subtotal and conditional checkout button */}
      <div className="mt-4">
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold">Subtotal</span>
          <span className="text-lg font-semibold">${items.reduce((total, item) => total + item.product.price * item.quantity, 0)}</span>
        </div>
        {/* Show checkout button only if there are items in the cart */}
        {items.length > 0 && (
          <button className="w-full py-3 bg-black text-white font-bold mt-4" onClick={handleCheckout}>Check out →</button>
        )}
      </div>
    </div>
  );
};

export default Cart;