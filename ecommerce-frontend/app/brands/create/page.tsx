'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../utils/axios'; 
import { useAuthStore } from '../../../context/userStore';

const CreateBrand = () => {
  const router = useRouter();
  const { user } = useAuthStore();  // Get authenticated user from auth store

  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make API request to create brand with authentication token
      await axios.post('/brands', { name }, { headers: { Authorization: `Bearer ${user.token}` } });
      // Redirect to brand listing page or display success message
      router.push('/brands');
    } catch (error) {
      console.error('Error creating brand:', error);
    }
  };

  return (
    <div>
      <h1>Create Brand</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Brand</button>
      </form>
    </div>
  );
};

export default CreateBrand;