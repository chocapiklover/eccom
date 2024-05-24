import { useEffect, useState } from 'react';
import axios from '../utils/axios';

const useProducts = () => {
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
  
    return { products, loading, error };
  };
  
  export default useProducts;