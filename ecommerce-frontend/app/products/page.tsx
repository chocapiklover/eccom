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
    <div className='bg-gray-200 '>
      <div className="flex justify-between items-center mb-4 border-b border-gray-800">
        <h1 className='text-5xl font-medium pl-2 py-2 capitalize'>All Products</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 min-h-[60vh] border border-gray-800">
  {products.map((product) => (
    <div key={product._id} className=" p-6 h-[40vh] flex flex-col border border-gray-800">
      <div className="flex-grow overflow-hidden  ">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain mb-4"
        />
      </div>
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-500">${product.price}</p>
    </div>
  ))}
</div>
    </div>
  );
};

export default ProductList;
