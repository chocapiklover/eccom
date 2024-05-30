/* eslint-disable @next/next/no-img-element */

'use client'


import useProducts from '../../../hooks/useProduct';
import { useState, useEffect } from 'react';
import { Product } from '../../../types/product';
import { useParams, useSearchParams } from 'next/navigation';
import useBrands from '../../../hooks/useBrands';
import Link from 'next/link';



const BrandProducts = () => {
   // Capture the brand name from the URL and decode it
   const params = useParams();
   const rawBrandName = Array.isArray(params.brand) ? params.brand[0] : params.brand;
   const brandName = decodeURIComponent(rawBrandName || '');

  // Fetch products and brands using the hooks
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();

  // State to store filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Ensure brandName is a string, and both products and brands are fetched
    if (brandName && typeof brandName === 'string' && brands.length > 0 && products.length > 0) {
      console.log('Brand Name:', brandName);
      console.log('All Products:', products);
      console.log('All Brands:', brands);

      // Find the brand ID based on the brand name
      const brand = brands.find((b) => b.name.toLowerCase() === brandName.toLowerCase());
      if (brand) {
        // Filter products by the brand ID
        const filtered = products.filter((product) => product.brand === brand._id);
        console.log('Filtered Products:', filtered);
        // Set the filtered products to state
        setFilteredProducts(filtered);
      }
    }
  }, [brandName, products, brands]);

  // Handle loading and error states
  if (productsLoading || brandsLoading) return <div>Loading...</div>;
  if (productsError) return <div>{productsError}</div>;
  if (brandsError) return <div>{brandsError}</div>;
  if (!brandName) return <div>Brand is not specified</div>;

  return (
    <div className="bg-gray-200 min-h-screen">
    <div>
      <div className="flex justify-between items-center mb-4 border-b border-gray-800">
        <h1 className='text-5xl font-medium pl-2 py-2 capitalize'>{brandName}</h1>
        <div>
          <span className="mr-4 font-semibold">Brands:</span>
          {/* Map through brands and create a link for each */}
          {brands.map((brand) => (
            <Link key={brand._id} href={`/products/${brand.name.toLowerCase()}`} className="text-pink-500 hover:underline mr-2">
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border border-gray-800 flex-grow">
        {filteredProducts.length === 0 ? (
          <div>No products found for this brand.</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="border p-6 h-[40vh] flex flex-col border-gray-800">
              <div className="flex-grow overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain mb-4"
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-500">${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  );
};

export default BrandProducts;