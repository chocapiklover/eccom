/* eslint-disable @next/next/no-img-element */
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";


const products = [
  {
    name: "Off-White x Dunk Low 'Lot 30 of 50'",
    price: "$580.00",
    image: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/063/041/907/original/784770_00.png.png?action=crop&width=900"
  },
  {
    name: "Dunk Low GS 'Triple Pink'",
    price: "$190.00",
    image: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/099/137/864/original/993755_00.png.png?action=crop&width=900"
  },
  {
    name: "Dunk Low SE 'Sashiko - Light Orewood Brown'",
    price: "$400.00",
    image: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/085/551/700/original/1055805_00.png.png?action=crop&width=900"
  },
  {
    name: "Dunk Low 'Knicks'",
    price: "$800.00",
    image: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/099/227/608/original/1355772_00.png.png?action=crop&width=900"
  },
  {
    name: "Nike Sb Dunk Low Ben & Jerry's Chunky Dunky",
    price: "$2,400.00",
    image: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/081/096/394/original/616017_00.png.png?action=crop&width=900"
  }
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



const DunksCarousel = () => {
  return (
    <section className="featured-collection border-b border-gray-300">
    {/* Dunks */}
    <div className="border-t border-gray-600 bg-gray-200 pb-8 pt-8 text-gray-800 lg:flex items-end justify-between">
      <h2 className="font-bold text-3xl px-2">Nike Dunks</h2>
    </div>

    {/* Carousel */}
    <div className="bg-gray-200 overflow-hidden pb-8">
  <Slider {...settings}>
    {products.map((product, index) => (
      <div key={index} className="flex justify-center">
        <div className="border border-gray-600 flex flex-col h-full" style={{ height: '400px' }}> {/* Set a fixed height */}
          <div className="flex-grow flex items-center justify-center overflow-hidden bg-gray-200" style={{ height: '300px' }}> {/* Set a fixed height for image container */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover px-2  h-auto max-h-80 lg:max-h-96 md:max-h-80 sm:max-h-64"
            />
          </div>
          <div className="border-t border-gray-600 p-4 flex flex-col justify-between bg-gray-200" style={{ height: '100px' }}> {/* Set a fixed height for text container */}
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

export default DunksCarousel;