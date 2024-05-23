'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../context/userStore';
import axios from '../utils/axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sneaker Shop</h1>
      {/* Display user's name if logged in */}
      {user ? (
        <div className="mb-4">
          <p className="text-lg">Welcome, {user.name}!</p>
          <button
            onClick={logout}
            className="mt-2 p-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-lg">You are not logged in.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.brand}</p>
            <p className="text-gray-900">${product.price}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Home;

