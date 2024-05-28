/* eslint-disable @next/next/no-img-element */
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";


const products = [
 
  {
    name: "New Balance 2002R Ssense Corduroy",
    price: "$520.00",
    image: "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/9238d2b2-9c47-4a75-b571-85650801b610.png?v=1698857559&width=2560"
  },
  {
    name: "Air Jordan 1 Low Wmns Ice Blue",
    price: "$400.00",
    image: "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/3cd56472-c705-4dfe-8751-4fd4a335078b.png?v=1698491505&width=850"
  },
  {
    name: "Vans Authentic Pro Supreme Checkers Red",
    price: "$800.00",
    image: "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/c6119db5-0ae1-419f-b62c-26226d5e483c.png?v=1698869304&width=2560"
  },
  {
    name: "Nike Sb Dunk Low Ben & Jerry's Chunky Dunky",
    price: "$2,400.00",
    image: "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/e30d457f-1e28-4e8f-a84f-005ff0305a27.png?v=1698412399&width=2560"
  }, 
  {
    name: "New Balance 990V6 Action Bronson Lapis Lazuli",
    price: "$580.00",
    image: "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/a71cc7a9-9f88-4ad3-94f8-17b0607f67c5.png?v=1698747693&width=1920"
  },
];

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


const NewArrivalsCarousel = () => {
  return (
    <section className="featured-collection border-b border-gray-300 ">
       {/* Announcement Bar */}
       <div className="bg-pink-400  border-t border-gray-800 py-3 overflow-hidden whitespace-nowrap relative">
        <div className="flex space-x-4 animate-marquee text-4xl"
            style={{ animationPlayState: 'running' }} 
            onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'} 
            onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}>

          <div className="flex-shrink-0 min-w-full flex">
            <p className="mx-4 text-black">
              Free Shipping On All Products   
            </p>
            <p className="mx-4 text-black">
              Free Shipping On All Products  
            </p>
            <p className="mx-4 text-black">
              Free Shipping On All Products  
            </p>
            <p className="mx-4 text-black">
              Free Shipping On All Products  
            </p>
          </div>
          <div className="flex-shrink-0 min-w-full flex">
            <p className="mx-4 text-black">
              Free Shipping On All Products  
            </p>
            <p className="mx-4 text-black">
              Free Shipping On All Products  
            </p>
            <p className="mx-4 text-black">
              Free Shipping On All Products  
            </p>
            <p className="mx-4 text-black">
              Free Shipping On All Products  
            </p>
          </div>
        </div>
        </div>

        {/* New Arrivals */}
      <div className="border-t  border-gray-600 bg-gray-200 pb-8 pt-8 text-gray-800 lg:flex items-end justify-between">
        <h2 className="font-bold text-3xl px-2">Latest Arrivals</h2>
      </div>

      {/* Carousel */}
      <div className="bg-gray-200 overflow-hidden pb-8">
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index} className="">  {/* Add padding to control spacing */}
              <div className="border border-gray-600 flex flex-col h-auto">
                <div className="flex-grow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover h-auto max-h-80 lg:max-h-96 md:max-h-80 sm:max-h-64"
                  />
                </div>
                <div className="border-t border-gray-600 p-4 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                  <p className="text-gray-500">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;
