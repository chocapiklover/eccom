'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../../../utils/axios';
import { useAuthStore } from '../../../context/userStore';


const CreateProduct = () => {
  const router = useRouter();
  const { user } = useAuthStore();  // Get authenticated user from auth store

  const [brands, setBrands] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    brand: '',
    size: '',
    color: '',
    stockQuantity: 0,
    images: ''
  });

  useEffect(() => {
    // Fetch brands from the API
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get('/brands');
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  // Handle input changes and update state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare product data for API request
    const product = {
      ...formData,
      size: formData.size.split(','),  // Convert size to array
      images: formData.images.split(',')  // Convert images to array
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
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <select id="brand" name="brand" value={formData.brand} onChange={handleChange} required>
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
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stockQuantity">Stock Quantity:</label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="images">Images:</label>
          <input
            type="text"
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;