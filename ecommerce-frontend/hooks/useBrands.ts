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
        console.log('API response:', data); // Log the API response for debugging
        // Check if the response is an array
        if (Array.isArray(data)) {
          // Set the brands data to state
          setBrands(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error: any) {
        // Handle different error structures
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('API error response:', error.response.data);
          setError(`API error: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          setError('No response received from the API');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', error.message);
          setError(`Error: ${error.message}`);
        }
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