/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../context/userStore';
import axios from '../utils/axios';
import { Product } from '../types/product'
import FeatureSection from '../components/FeatureSection';
import { HoverImageProvider } from '../context/HoverImageContext';
import HoverImageDisplay from '../components/HoverImageDisplay';
import NewArrivalsCarousel from '../components/NewArrivalsCarousel';
import About from '../components/About';
import DoubleBanner from '../components/DoubleBanner';
import Showcase from '../components/Showcase';
import DunksCarousel from '../components/DunksCarousel';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';


const Home = () => {
  const [products, setProducts] = useState<Product[]>([]); // Use the Product type
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true when component mounts (client-side)
    
    const fetchProducts = async () => {
      const { data } = await axios.get('/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <HoverImageProvider>
      <div>
        <FeatureSection />
        <NewArrivalsCarousel />
        <About />
        <DoubleBanner />
        <Showcase />
        <DunksCarousel />
        <Testimonials />
        <Footer />
        <HoverImageDisplay />
      </div>
    </HoverImageProvider>
  );
};

export default Home;


// <h1 className="text-2xl font-bold mb-4">Sneaker Shop</h1>
//       {/* Display user's name if logged in */}
//       {isClient ? (
//         user ? (
//           <div className="mb-4">
//             <p className="text-lg">Welcome, {user.name}!</p>
//             <button
//               onClick={logout}
//               className="mt-2 p-2 bg-red-500 text-white rounded"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="mb-4">
//             <p className="text-lg">You are not logged in.</p>
//           </div>
//         )
//       ) : (
//         <div className="mb-4">
//           <p className="text-lg">Loading...</p>
//         </div>
//       )}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <div key={product._id} className="border p-4 rounded">
//             <img
//               src={product.images[0]}
//               alt={product.name}
//               className="w-full h-48 object-cover mb-4"
//             />
//             <h2 className="text-lg font-semibold">{product.name}</h2>
//             <p className="text-gray-500">{product.brand}</p>
//             <p className="text-gray-900">${product.price}</p>
//           </div>
//         ))}
//       </div>
