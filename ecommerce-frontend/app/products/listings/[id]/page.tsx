/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { useParams } from 'next/navigation';
import { Product } from '../../../../types/product';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCartStore } from '../../../../context/useCartStore'; 
import { useAuthStore } from '../../../../context/userStore'; 
import Cart from '../../../../components/Cart';

const ProductPage = () => {
  const { id } = useParams(); // Get the dynamic route parameter
  const [product, setProduct] = useState<Product | null>(null); // State to hold the product data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // State to manage selected size
  const { addItem } = useCartStore(); // Access the addItem function from the cart store
  const { user } = useAuthStore(); // Access the user from the auth store
  const [isCartVisible, setIsCartVisible] = useState(false); // State to manage cart visibility


  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true); // Set loading state to true before fetching data
          const response = await axios.get(`/products/${id}`);
          setProduct(response.data); // Update product state with fetched data
        } catch (err) {
          setError('Failed to fetch product'); // Set error message if fetching fails
        } finally {
          setLoading(false); // Set loading state to false after fetching data
        }
      };

      fetchProduct();
    }
  }, [id]); // Dependency array to re-run the effect when the product ID changes

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to the cart');
      return;
    }
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product) {
      try {
        await addItem(product._id, 1, selectedSize); // Add the item to the cart with quantity 1 and selected size
        setIsCartVisible(true); // Show the cart component
      } catch (error) {
        console.error(error);
        alert('Failed to add item to cart');
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true, // Adjust the height based on the slide content
  };

  if (loading) return <div>Loading...</div>; // Display loading message while data is being fetched
  if (error) return <div>{error}</div>; // Display error message if fetching fails

  return (
    <div className="bg-gray-200 min-h-screen h-screen flex"> {/* Main container */}
      <div className="w-full h-full mx-auto grid grid-cols-1 lg:grid-cols-2"> {/* Grid container */}
        <div className="flex justify-center items-center p-4 border-b lg:border-r border-gray-800"> {/* Image container */}
          <div className="w-full slick-slider"> {/* Slider container */}
            <Slider {...settings} className="slick-list">
              {product?.images.map((image, index) => (
                <div key={index} className="flex justify-center items-center w-full">
                  <img src={image} alt={product?.name} className="w-full h-auto max-h-96 object-contain" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="bg-gray-200 p-2 border-b border-gray-800"> {/* Details container */}
          <h1 className="text-5xl sm:text-8xl font-medium mb-4">{product?.name}</h1> {/* Product name */}
          <p className="text-gray-500 text-2xl mb-4">${product?.price}</p> {/* Product price */}
          <div className="mb-4">
            <span className="text-xl">Size:</span>
            <div className="flex space-x-2 mt-2">
              {product?.size.map((size: string) => (
                <button
                  key={size}
                  className={`px-4 py-2 border ${selectedSize === size ? 'bg-pink-500 text-white' : 'border-gray-300 hover:border-pink-500 hover:text-pink-500'}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleAddToCart} className="w-full max-w-3xl py-3 text-lg border border-black mb-2 hover:border-pink-500 hover:text-pink-500">
            Add to cart
          </button>
          <button className="w-full max-w-3xl py-3 bg-black text-white text-lg hover:bg-pink-500">
            Buy it now
          </button>
          <div className="mt-4">
            <p>{product?.description}</p> {/* Product description */}
          </div>
        </div>
      </div>
        {/* Cart Component */}
        {isCartVisible && (
        <div className="fixed w-76 top-0 right-0 h-full sm:w-96 bg-gray-200 border-l border-gray-900 p-2 z-30">
          <button
            onClick={() => setIsCartVisible(false)}
            className="text-gray-900 focus:outline-none pl-2 mb-4 text-3xl"
          >
            ✕
          </button>
          <Cart userId={user._id} /> {/* Pass the userId prop */}
        </div>
      )}
    </div>
  );
};

export default ProductPage;