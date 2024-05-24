'use client'

import { useEffect, useState } from 'react';
import axios from '../../utils/axios'; 

const BrandList = () => {
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchBrands = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get('/brands');
          setBrands(data);
        } catch (error) {
          setError('Failed to fetch brands');
        } finally {
          setLoading(false);
        }
      };
  
      fetchBrands();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
      <div>
        <h1>Brand List</h1>
        <ul>
          {brands.length > 0 ? (
            brands.map(brand => (
              <li key={brand._id}>
                {brand.name}
              </li>
            ))
          ) : (
            <li>No brands found</li>
          )}
        </ul>
      </div>
    );
  };
  
  export default BrandList;