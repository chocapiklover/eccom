'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../utils/axios';  // Import the Axios instance
import { useAuthStore } from '../context/userStore';
import useBrands from '../hooks/useBrands';  // Custom hook for fetching brands

const CreateProduct = () => {
  const router = useRouter();
  const { user } = useAuthStore();  // Get authenticated user from auth store
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();

  // State for product form
  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    price: 0,
    brand: '',
    size: '',
    color: '',
    stockQuantity: 0,
    images: ''
  });

  // Handle input changes for product form
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle product form submission
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare product data for API request
    const product = {
      ...productFormData,
      size: productFormData.size.split(','),  // Convert size to array
      images: productFormData.images.split(',')  // Convert images to array
    };

    try {
      // Make API request to create product with authentication token
      await axios.post('/products', product, { headers: { Authorization: `Bearer ${user.token}` } });
      // Redirect to product listing page after successful creation
      router.push('/products');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleProductSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productFormData.name}
            onChange={handleProductChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={productFormData.description}
            onChange={handleProductChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productFormData.price}
            onChange={handleProductChange}
            required
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <select id="brand" name="brand" value={productFormData.brand} onChange={handleProductChange} required>
            <option value="">Select a brand</option>
            {brands.map(brand => (
              <option key={brand._id} value={brand._id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="size">Size:</label>
          <input
            type="text"
            id="size"
            name="size"
            value={productFormData.size}
            onChange={handleProductChange}
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={productFormData.color}
            onChange={handleProductChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stockQuantity">Stock Quantity:</label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={productFormData.stockQuantity}
            onChange={handleProductChange}
            required
          />
        </div>
        <div>
          <label htmlFor="images">Images:</label>
          <input
            type="text"
            id="images"
            name="images"
            value={productFormData.images}
            onChange={handleProductChange}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;