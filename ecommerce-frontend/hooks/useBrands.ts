import { useEffect, useState } from 'react';
import axios from '../utils/axios';

const useBrands = () => {
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchBrands = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get('/brands');
          if (Array.isArray(data)) {
            setBrands(data);
          } else {
            throw new Error('Invalid response format');
          }
        } catch (error) {
          setError('Failed to fetch brands');
        } finally {
          setLoading(false);
        }
      };
  
      fetchBrands();
    }, []);
  
    return { brands, loading, error };
  };
  
  export default useBrands;