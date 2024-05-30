/* eslint-disable @next/next/no-img-element */
'use client'
import useProducts from '../../hooks/useProduct';
import useBrands from '../../hooks/useBrands';
import Link from 'next/link';

const ProductList = () => {
  const { products, loading: productsLoading, error: productsError } = useProducts(); // Fetch products
  const { brands, loading: brandsLoading, error: brandsError } = useBrands(); // Fetch brands

  // Handle loading and error states
  if (productsLoading || brandsLoading) return <div>Loading...</div>;
  if (productsError) return <div>{productsError}</div>;
  if (brandsError) return <div>{brandsError}</div>;

  return (

    // {/* Main container with background color and minimum height */}
    <div className="bg-gray-200 min-h-screen"> 
      <div className="border-gray-800 w-screen"> 
        <h1 className="text-5xl font-medium capitalize pl-2 mb-4 pt-3">All</h1> 
          
        {/* Brands list container */}
        <div className="pl-2 flex flex-wrap items-left border-t border-gray-800"> 
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/products/${brand.name.toLowerCase()}`}
              className="text-xl text-pink-500 hover:underline mr-4 sm:my-2"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>

        {/* Grid container for products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-grow"> 
        {products.map((product) => (

          //  {/* Wrap product card with Link */}
          <Link key={product._id} href={`/products/listings/${product._id}`} className="block">
            <div className="p-6 h-[40vh] flex flex-col border border-gray-800"> {/* Product card container */}
              <div className="flex-grow overflow-hidden"> {/* Image container */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain mb-4"
                />
              </div>
              <h2 className="text-sm sm:text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p> 
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
