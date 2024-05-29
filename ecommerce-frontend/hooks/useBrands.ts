import { useEffect, useState } from 'react';
import axios from '../utils/axios';

// Define the Brand interface
interface Brand {
  _id: string;
  name: string;
}

const useBrands = () => {
  // State to store the brands data
  const [brands, setBrands] = useState<Brand[]>([]);
  // State to handle loading state
  const [loading, setLoading] = useState<boolean>(true);
  // State to handle any errors
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch brands from the API
    const fetchBrands = async () => {
      try {
        setLoading(true);
        // Make the API call to fetch brands
        const { data } = await axios.get('/brands');
        // Check if the response is an array
        if (Array.isArray(data)) {
          // Set the brands data to state
          setBrands(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        // Set error message if the API call fails
        setError('Failed to fetch brands');
      } finally {
        // Set loading state to false after the API call is done
        setLoading(false);
      }
    };

    // Call the fetchBrands function
    fetchBrands();
  }, []);

  // Return the brands, loading state, and error
  return { brands, loading, error };
};

export default useBrands;