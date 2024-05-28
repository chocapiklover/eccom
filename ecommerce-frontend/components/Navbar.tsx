'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);

  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const toggleShopMenu = () => {
        setIsShopOpen(!isShopOpen);
      };
  
    return (
      <div className="bg-gray-200 border-b border-gray-800">
          {/* Announcement Bar */}
      <div className="bg-gray-200 border-b border-gray-800 py-2 overflow-hidden whitespace-nowrap relative">
        <div className="flex space-x-4 animate-marquee text-2xl"
            style={{ animationPlayState: 'running' }} 
            onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'} 
            onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}>

          <div className="flex-shrink-0 min-w-full flex">
            <p className="mx-4 text-black hover:text-pink-500">
              New Dunks and Air Jordan have dropped. Get in quick before you miss out.
            </p>
            <p className="mx-4 text-black hover:text-pink-500">
              New Dunks and Air Jordan have dropped. Get in quick before you miss out.
            </p>
            <p className="mx-4 text-black hover:text-pink-500">
              New Dunks and Air Jordan have dropped. Get in quick before you miss out.
            </p>
            <p className="mx-4 text-black hover:text-pink-500">
              New Dunks and Air Jordan have dropped. Get in quick before you miss out.
            </p>
          </div>
          <div className="flex-shrink-0 min-w-full flex">
            <p className="mx-4 text-black hover:text-pink-500">
              New Dunks and Air Jordan have dropped. Get in quick before you miss out.
            </p>
            <p className="mx-4 text-black hover:text-pink-500">
              New Dunks and Air Jordan have dropped. Get in quick before you miss out.
            </p>
            <p className="mx-4 text-black hover:text-pink-500">
              New Dunks and Air Jordan have dropped. Get in quick before you miss out.
            </p>
            <p className="mx-4 text-black hover:text-pink-500">
              New Dunks and Air Jordan have dropped. Get in quick before you miss out.
            </p>
          </div>
        </div>
        </div>
         
      {/* Main Navbar */}
      <nav className="relative py-">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="text-2xl font-bold">
          <Link href="/">Baseline</Link>
        </div>
        <div className="hidden lg:flex flex-1 justify-evenly">
          <div className="relative text-xl">
            <button
              onClick={toggleShopMenu}
              className="hover:underline focus:outline-none"
            >
              Shop {isShopOpen ? '−' : '+'}
            </button>
          </div >
          <Link href="/blog" className="hover:underline text-xl">Blog</Link>
          <Link href="/about" className="hover:underline text-xl">About</Link>
          <Link href="/search" className="hover:underline text-xl">Search</Link>
          <Link href="/cart" className="hover:underline text-xl">Cart (1)</Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="hover:underline focus:outline-none"
          >
            Menu
          </button>
        </div>
      </div>
      {isShopOpen && (
        <div className="absolute left-0 w-full bg-gray-200 border-t border-b border-gray-800 z-10 flex border-l border-r">
          <div className="flex flex-col space-y-2 border-r  border-gray-800 pl-4 pr-12 pt-4">
            <Link href="/shop/all" className="block hover:underline">
              Shop All
            </Link>
            <Link href="/shop/new" className="block hover:underline">
              New Arrivals
            </Link>
            <Link href="/shop/sale" className="block hover:underline">
              On Sale
            </Link>
          </div>
          <div className="flex flex-col space-y-2 border-r  border-gray-800 pl-4 pr-12 pt-4 pb-2 ">
            <span className="block font-bold pb-2">Brands</span>
            <Link href="/shop/brands/air-jordan" className="block hover:underline">
              Air Jordan
            </Link>
            <Link href="/shop/brands/asics" className="block hover:underline">
              Asics
            </Link>
            <Link href="/shop/brands/converse" className="block hover:underline">
              Converse
            </Link>
            <Link href="/shop/brands/crocs" className="block hover:underline">
              Crocs
            </Link>
            <Link href="/shop/brands/new-balance" className="block hover:underline">
              New Balance
            </Link>
            <Link href="/shop/brands/nike-dunks" className="block hover:underline">
              Nike Dunks
            </Link>
            <Link href="/shop/brands/reebok" className="block hover:underline">
              Reebok
            </Link>
            <Link href="/shop/brands/vans" className="block hover:underline">
              Vans
            </Link>
          </div>
        </div>
      )}
    </nav>
  
        {/* Sidebar Menu */}
        <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-200 border-r border-gray-900 p-2 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden z-30`}
      >
        <button
          onClick={toggleMenu}
          className="text-gray-900 focus:outline-none mb-4 text-3xl"
        >
          ✕
        </button>
        <div className="space-y-8">
          <div className="w-full border-b border-gray-700 pb-4">
            <Link href="/shop" className="block text-3xl hover:underline">Shop</Link>
            <div className="mt-4 space-y-2 ml-4 text-2xl">
              <Link href="/shop/all" className="block text-base hover:underline">Shop All</Link>
              <Link href="/shop/new" className="block text-base hover:underline">New Arrivals</Link>
              <Link href="/shop/sale" className="block text-base hover:underline">On Sale</Link>
              <Link href="/shop/brands" className="block text-base hover:underline">Brands</Link>
            </div>
          </div>
          <div className="w-full border-b border-gray-900 pb-4">
            <Link href="/blog" className="block text-3xl hover:underline">Blog</Link>
          </div>
          <div className="w-full border-b border-gray-900 pb-4">
            <Link href="/about" className="block text-3xl hover:underline">About</Link>
          </div>
          <div className="w-full pb-4">
            <Link href="/search" className="block text-3xl hover:underline">Search</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Navbar;