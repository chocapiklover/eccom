/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { useParams } from 'next/navigation';

const ProductPage = () => {
  const { id } = useParams(); // Get the dynamic route parameter
  const [product, setProduct] = useState<any>(null); // State to hold the product data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  useEffect(() => {
    if (id) {
      // Function to fetch product data from the API
      const fetchProduct = async () => {
        try {
          setLoading(true); // Set loading state to true before fetching data
          console.log(`Fetching product with ID: ${id}`); // Debugging log
          const response = await axios.get(`/products/${id}`);
          setProduct(response.data); // Update product state with fetched data
        } catch (err) {
          console.error('Error fetching product:', err); // Debugging log
          setError('Failed to fetch product'); // Set error message if fetching fails
        } finally {
          setLoading(false); // Set loading state to false after fetching data
        }
      };

      fetchProduct();
    }
  }, [id]); // Dependency array to re-run the effect when the product ID changes

  // Display loading message while data is being fetched
  if (loading) return <div>Loading...</div>;

  // Display error message if fetching fails
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6"> {/* Container with padding */}
      <h1 className="text-5xl font-medium mb-4">{product.name}</h1> {/* Product name */}
      <img src={product.images[0]} alt={product.name} className="w-full h-auto mb-4" /> {/* Product image */}
      <p className="text-gray-500">${product.price}</p> {/* Product price */}
      <p>{product.description}</p> {/* Product description */}
    </div>
  );
};

export default ProductPage;