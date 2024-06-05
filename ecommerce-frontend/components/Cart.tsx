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
  const { items, removeItem, fetchCart } = useCartStore(); // Access the cart items and functions
  const router = useRouter();

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        await fetchCart(userId);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId, fetchCart]);

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
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">Your cart - {items.length} item{items.length !== 1 && 's'}</h2>
        
      </div>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={`${item.product._id}-${item.size}`} className="mb-4 border-b pb-4 flex justify-between">
              <div className="flex items-center">
                <img
                  src={item.product.images?.[0] || '/path/to/fallback/image.png'} // Fallback image
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
      <div className="mt-4">
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold">Subtotal</span>
          <span className="text-lg font-semibold">${items.reduce((total, item) => total + item.product.price * item.quantity, 0)}</span>
        </div>
        <button className="w-full py-3 bg-black text-white font-bold mt-4" onClick={handleCheckout}>Check out →</button>
      </div>
    </div>
  );
};

export default Cart;