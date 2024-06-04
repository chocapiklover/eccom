/* eslint-disable @next/next/no-img-element */
import React from 'react';
import useProducts from '../hooks/useProduct'; // Import your hook
import useBrands from '../hooks/useBrands'; // Import your hook
import Link from 'next/link'; // Import Link component

const Showcase = () => {
  const { products, loading: productsLoading, error: productsError } = useProducts(); // Use the hook to fetch products
  const { brands, loading: brandsLoading, error: brandsError } = useBrands(); // Use the hook to fetch brands

  if (productsLoading || brandsLoading) return <div>Loading...</div>; // Handle loading state
  if (productsError) return <div>{productsError}</div>; // Handle error state
  if (brandsError) return <div>{brandsError}</div>; // Handle error state

  // Find the brand IDs for "Nike Dunk" and "Air Jordan"
  const nikeDunkBrand = brands.find(brand => brand.name.toLowerCase() === 'nike dunks');
  const airJordanBrand = brands.find(brand => brand.name.toLowerCase() === 'air jordan');
  
  if (!nikeDunkBrand || !airJordanBrand) return <div>Brands not found</div>;

  // Filter products that belong to "Nike Dunk" and "Air Jordan"
  const nikeDunkProducts = products.filter(product => product.brand === nikeDunkBrand._id);
  const airJordanProducts = products.filter(product => product.brand === airJordanBrand._id);

  // Select one product from each brand
  const nikeDunkProduct = nikeDunkProducts[3];
  const airJordanProduct = airJordanProducts[7];

  if (!nikeDunkProduct || !airJordanProduct) return <div>Products not found</div>;

  return (
    <section className="bg-gray-200 ">
      <div className="max-w-full flex flex-wrap h-screen">
        <div className="w-full lg:w-1/2 relative border border-gray-800">
          <Link href={`/products/listings/${nikeDunkProduct._id}`}>
            <img
              src={nikeDunkProduct.images[0]}
              alt={nikeDunkProduct.name}
              className="w-full h-full object-contain p-6"
            />
            <div className="absolute top-4 left-4 text-black text-lg">
              Shop Nike Dunk
            </div>
          </Link>
        </div>
        <div className="w-full lg:w-1/2 relative border border-gray-800">
          <Link href={`/products/listings/${airJordanProduct._id}`}>
            <img
              src={airJordanProduct.images[0]}
              alt={airJordanProduct.name}
              className="w-full h-full object-contain p-6"
            />
            <div className="absolute top-4 left-4 text-black text-lg">
              Shop Air Jordan
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Showcase;