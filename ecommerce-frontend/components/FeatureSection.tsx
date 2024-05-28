import Link from "next/link";
import { useState } from "react";
import { useHoverImage } from '../context/HoverImageContext'

const images: { [key: string]: string } = {
    "shop-all": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/a71cc7a9-9f88-4ad3-94f8-17b0607f67c5.png?v=1698747693&width=1920",
    "new-arrivals": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/b1dd3f6c-cae6-4c26-b36d-4353bc7d6c7f.png?v=1698918687&width=850",
    "air-jordan": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/ab816bc1-5483-4b04-97a9-3e0d39ba8517.png?v=1698517644&width=1280",
    "nike-dunks": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/3cd56472-c705-4dfe-8751-4fd4a335078b.png?v=1698491505&width=850",
    "new-balance": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/5241682d-a9c9-4343-a53c-4c767181f6d0.png?v=1698852115&width=1920",
    "asics": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/5442cb34-a043-4e9f-bab9-dcd635b9b890.png?v=1698921725&width=1920",
    "converse": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/5d8c2c86-b6a1-4d6a-8bbe-d69962b2753b.png?v=1698914234&width=1920",
    "crocs": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/dfcbb1af-418d-4a1e-ac08-14f97ff25492.png?v=1698918293&width=1920",
    "reebok": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/c6eca236-b00b-4862-adca-2c35b4bcaa8d.png?v=1698915865&width=1920",
    "vans": "https://baseline-preset-modern-2.myshopify.com/cdn/shop/files/38235ca4-bad2-4654-ae35-bab0ac3605d6.png?v=1698861400&width=1920"
  };

const FeatureSection = () => {
    const { setHoveredImage } = useHoverImage();

    const handleMouseEnter = (key: string) => {
      setHoveredImage(images[key]);
    };
  
    const handleMouseLeave = () => {
      setHoveredImage(null);
    };

  return (
    <div className="relative w-full bg-gray-200 p-8 border-t border-gray-300">
      <div className="flex flex-wrap items-center justify-start sm:text-9xl text-5xl font-bold">
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('shop-all')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/all" className="hover:underline hover:text-pink-500">
            Shop All
          </Link>
          <span className="text-xl ml-2">71</span>
        </div>
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('new-arrivals')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/new" className="hover:underline hover:text-pink-500">
            New Arrivals
          </Link>
          <span className="text-xl ml-2">7</span>
        </div>
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('air-jordan')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/brands/air-jordan" className="hover:underline hover:text-pink-500">
            Air Jordan
          </Link>
          <span className="text-xl ml-2">16</span>
        </div>
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('nike-dunks')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/brands/nike-dunks" className="hover:underline hover:text-pink-500">
            Nike Dunks
          </Link>
          <span className="text-xl ml-2">8</span>
        </div>
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('new-balance')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/brands/new-balance" className="hover:underline hover:text-pink-500">
            New Balance
          </Link>
          <span className="text-xl ml-2">16</span>
        </div>
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('asics')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/brands/asics" className="hover:underline hover:text-pink-500">
            Asics
          </Link>
          <span className="text-xl ml-2">7</span>
        </div>
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('converse')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/brands/converse" className="hover:underline hover:text-pink-500">
            Converse
          </Link>
          <span className="text-xl ml-2">3</span>
        </div>
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('crocs')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/brands/crocs" className="hover:underline hover:text-pink-500">
            Crocs
          </Link>
          <span className="text-xl ml-2">4</span>
        </div>
        <div className="flex items-baseline mr-8"
             onMouseEnter={() => handleMouseEnter('reebok')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/brands/reebok" className="hover:underline hover:text-pink-500">
            Reebok
          </Link>
          <span className="text-xl ml-2">3</span>
        </div>
        <div className="flex items-baseline"
             onMouseEnter={() => handleMouseEnter('vans')}
             onMouseLeave={handleMouseLeave}>
          <Link href="/shop/brands/vans" className="hover:underline hover:text-pink-500">
            Vans
          </Link>
          <span className="text-xl ml-2">4</span>
        </div>
      </div>
    </div>
  );
};
  
  export default FeatureSection;