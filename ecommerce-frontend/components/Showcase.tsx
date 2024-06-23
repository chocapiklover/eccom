/* eslint-disable @next/next/no-img-element */
import React from 'react';
import useProducts from '../hooks/useProduct'; // Import your hook
import useBrands from '../hooks/useBrands'; // Import your hook
import Link from 'next/link'; // Import Link component

const Showcase: React.FC = () => {
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();

  // Handle loading and error states
  if (productsLoading || brandsLoading) return <div>Loading...</div>;
  if (productsError) return <div>{productsError}</div>;
  if (brandsError) return <div>{brandsError}</div>;

  console.log('Products:', products);
  console.log('Brands:', brands);

  // Find the brand IDs for "Nike Dunk" and "Air Jordan"
  const nikeDunkBrand = brands.find(brand => brand.name.toLowerCase() === 'nike dunks');
  const airJordanBrand = brands.find(brand => brand.name.toLowerCase() === 'air jordan');

  if (!nikeDunkBrand || !airJordanBrand) return <div>Brands not found</div>;

  console.log('Nike Dunk Brand ID:', nikeDunkBrand._id);
  console.log('Air Jordan Brand ID:', airJordanBrand._id);

  // Log each product's brand to see its structure
  products.forEach(product => {
    console.log(`Product: ${product.name}, Brand:`, product.brand);
  });

  // Filter products that belong to "Nike Dunk" and "Air Jordan"
  const nikeDunkProducts = products.filter(product => product.brand._id === nikeDunkBrand._id);
  const airJordanProducts = products.filter(product => product.brand._id === airJordanBrand._id);

  console.log('Nike Dunk Products:', nikeDunkProducts);
  console.log('Air Jordan Products:', airJordanProducts);

  // Select one product from each brand
  const nikeDunkProduct = nikeDunkProducts[0];
  const airJordanProduct = airJordanProducts[0];

  if (!nikeDunkProduct || !airJordanProduct) return <div>Products not found</div>;

  console.log('Nike Dunk Product:', nikeDunkProduct);
  console.log('Air Jordan Product:', airJordanProduct);

  return (
    <section className="bg-gray-200">
      <div className="max-w-full flex flex-wrap h-screen">
        <div className="w-full lg:w-1/2 relative border border-gray-800">
          <Link href={`/products/listings/${nikeDunkProduct._id}`}>
           
              <img
                src={nikeDunkProduct.images[0]}
                alt={nikeDunkProduct.name}
                className="w-full h-full object-contain p-6"
              />
              <div className="absolute top-4 left-4 text-black text-lg bg-white p-2 rounded-md">
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
              <div className="absolute top-4 left-4 text-black text-lg bg-white p-2 rounded-md">
                Shop Air Jordan
              </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Showcase;