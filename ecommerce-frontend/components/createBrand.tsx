'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../utils/axios';  // Import the Axios instance
import { useAuthStore } from '../context/userStore';

const CreateBrand = () => {
  const router = useRouter();
  const { user } = useAuthStore();  // Get authenticated user from auth store

  // State for brand form
  const [brandName, setBrandName] = useState('');

  // Handle input changes for brand form
  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
  };

  // Handle brand form submission
  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make API request to create brand with authentication token
      await axios.post('/brands', { name: brandName }, { headers: { Authorization: `Bearer ${user.token}` } });
      // Refresh the page or brands list after successful creation
      router.push('/brands');
    } catch (error) {
      console.error('Error creating brand:', error);
    }
  };

  return (
    <div>
      <h2>Create Brand</h2>
      <form onSubmit={handleBrandSubmit}>
        <div>
          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={brandName}
            onChange={handleBrandChange}
            required
          />
        </div>
        <button type="submit">Create Brand</button>
      </form>
    </div>
  );
};

export default CreateBrand;