'use client'

import { useEffect, useState } from 'react';
import axios from '../../utils/axios'

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/products');
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id}>
              {product.name} - ${product.price}
            </li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
};

export default ProductList;