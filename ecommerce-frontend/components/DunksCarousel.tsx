/* eslint-disable @next/next/no-img-element */
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import useProducts from '../hooks/useProduct'; // Import your hook
import useBrands from '../hooks/useBrands'; // Import your hook
import Link from 'next/link'; // Import Link component

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <BsArrowRight />,
  prevArrow: <BsArrowLeft />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const DunksCarousel = () => {
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();

  if (productsLoading || brandsLoading) return <div>Loading...</div>;
  if (productsError) return <div>{productsError}</div>;
  if (brandsError) return <div>{brandsError}</div>;

  // Find the brand ID for "Nike Dunks"
  const nikeDunksBrand = brands.find(brand => brand.name.toLowerCase() === 'nike dunks');
  if (!nikeDunksBrand) {
    console.error('Nike Dunks brand not found', brands);
    return <div>Nike Dunks brand not found</div>;
  }

  // Filter products that belong to "Nike Dunks"
  const nikeDunksProducts = products.filter(product => {
    if (typeof product.brand === 'object' && 'name' in product.brand) {
      return (product.brand as { _id: string })._id === nikeDunksBrand._id;
    }
    return false;
  });

  // Limit the number of products to display (optional)
  const displayedProducts = nikeDunksProducts.slice(0, 5);

  return (
    <section className="featured-collection border-b border-gray-300">
      <div className="border-gray-600 bg-gray-200 pb-8 pt-8 text-gray-800 lg:flex items-end justify-between">
        <h2 className="font-bold text-3xl px-2">Nike Dunks</h2>
      </div>

      <div className="bg-gray-200 overflow-hidden pb-8">
        <Slider {...settings}>
          {displayedProducts.map((product, index) => (
            <div key={index} className="flex justify-center">
              <Link href={`/products/listings/${product._id}`} className="border border-gray-600 flex flex-col h-full" style={{ height: '400px' }}>
                <div className="flex-grow flex items-center justify-center overflow-hidden bg-gray-200" style={{ height: '300px' }}>
                  <img
                    src={product.images[0]} // Use the product image from the fetched data
                    alt={product.name}
                    className="w-full object-cover px-2 h-auto max-h-80 lg:max-h-96 md:max-h-80 sm:max-h-64"
                  />
                </div>
                <div className="border-t border-gray-600 p-4 flex flex-col justify-between bg-gray-200" style={{ height: '100px' }}>
                  <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default DunksCarousel;