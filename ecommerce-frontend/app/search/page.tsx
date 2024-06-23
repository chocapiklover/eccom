/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, ChangeEvent } from 'react';
import Fuse from 'fuse.js';
import useProducts from '../../hooks/useProduct';
import { Product } from '@/types/product';
import Link from 'next/link';

// Define the SearchComponent
const SearchComponent: React.FC = () => {
  // Destructure products, loading, and error states from the useProducts hook
  const { products, loading, error } = useProducts();
  
  // State to hold the search query
  const [query, setQuery] = useState<string>('');
  
  // State to hold the search results
  const [results, setResults] = useState<Product[]>([]);

  // Initialize Fuse.js with products and search keys
  const fuse = new Fuse(products, {
    keys: ['name', 'description', 'brand.name'], // Search in name, description, and brand name
    threshold: 0.3, 
  });

  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      setResults([]); // Clear results if the query is empty
    } else {
      const result = fuse.search(e.target.value); // Perform search
      setResults(result.map(r => r.item)); // Map results to items
    }
  };

  // Display loading state if data is being fetched
  if (loading) return <div>Loading...</div>;
  
  // Display error message if there is an error
  if (error) return <div>{error}</div>;

  // Render the search component
  return (
    <div className="container mx-auto p-4">
      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search products..."
        className="w-full p-2 border rounded"
      />
      {/* Display search results */}
      <ul className="mt-4">
        {results.map((product, index) => (
          <Link key={product._id} href={`/products/listings/${product._id}`} className="block">
            <li className="border-b py-2 flex items-center">
              {/* Product image */}
              <img
                src={product.images[0]} 
                alt={product.name}
                className="mr-4"
              />
              <div>
                {/* Product details */}
                <p className="font-bold">{product.name}</p>
                <p>{product.description}</p>
                <p>Brand: {(product.brand as any).name}</p> {/* Display the brand name */}
                <p>Price: ${product.price}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;