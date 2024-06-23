'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Cart from './Cart'; // Import the Cart component
import { useAuthStore } from '../context/userStore'; // Import the auth store

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility
  const { user, logout } = useAuthStore(); // Access the user and logout function from the auth store

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleShopMenu = () => {
    setIsShopOpen(!isShopOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-gray-200 border-b border-gray-800">
      {/* Announcement Bar */}
      <div
        className="bg-gray-200 border-b border-gray-800 py-2 overflow-hidden whitespace-nowrap relative"
      >
        <div
          className="flex space-x-4 animate-marquee text-2xl"
          style={{ animationPlayState: 'running' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
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
            <Link href="/">StreetHeat</Link>
          </div>
          <div className="hidden lg:flex flex-1 justify-evenly">
            <div className="relative text-xl">
              <button
                onClick={toggleShopMenu}
                className="hover:underline focus:outline-none"
              >
                Shop {isShopOpen ? '−' : '+'}
              </button>
            </div>
            <Link href="/blog" className="hover:underline text-xl">
              Blog
            </Link>
            <Link href="/about" className="hover:underline text-xl">
              About
            </Link>
            <Link href="/search" className="hover:underline text-xl">
              Search
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={toggleCart}
                    className="hover:underline text-xl"
                  >
                    Cart
                  </button>
                  <div className="flex items-center space-x-2">
                    <Link href="/profile" className="text-xl text-pink-400 pr-2 ">Hello, {user.name}</Link>
                    <button
                      onClick={logout}
                      className="hover:underline text-xl text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link href="/auth/login" className="hover:underline text-xl">
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="hover:underline focus:outline-none"
            >
              Menu
            </button>
            {user && (
              <button
                onClick={toggleCart}
                className="pl-4 hover:underline focus:outline-none"
              >
                Cart
              </button>
            )}
          </div>
        </div>

        {/* Drop down menu */}
        {isShopOpen && (
          <div className="absolute left-0 w-full bg-gray-200 border-t border-b border-gray-800 z-10 flex border-l border-r">
            <div className="flex flex-col space-y-2 border-r border-gray-800 pl-4 pr-12 pt-4">
              <Link href="/products" className="block hover:underline">
                Shop All
              </Link>
              <Link href="/products" className="block hover:underline">
                New Arrivals
              </Link>
              <Link href="/products" className="block hover:underline">
                On Sale
              </Link>
            </div>
            <div className="flex flex-col space-y-2 border-r border-gray-800 pl-4 pr-12 pt-4 pb-2 ">
              <span className="block font-bold pb-2">Brands</span>
              <Link
                href="/products/air%20jordan"
                className="block hover:underline"
              >
                Air Jordan
              </Link>
              <Link href="/products/asics" className="block hover:underline">
                Asics
              </Link>
              <Link
                href="/products/converse"
                className="block hover:underline"
              >
                Converse
              </Link>
              <Link href="/products/crocs" className="block hover:underline">
                Crocs
              </Link>
              <Link
                href="/products/new%20balance"
                className="block hover:underline"
              >
                New Balance
              </Link>
              <Link
                href="/products/nike%20dunks"
                className="block hover:underline"
              >
                Nike Dunks
              </Link>
              <Link href="/products/reebok" className="block hover:underline">
                Reebok
              </Link>
              <Link href="/products/vans" className="block hover:underline">
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
            <Link href="/products" className="block text-3xl hover:underline">
              Shop
            </Link>
            <div className="mt-4 space-y-2 ml-4 text-2xl">
              <Link
                href="/products"
                className="block text-base hover:underline"
              >
                Shop All
              </Link>
              <Link
                href="/products"
                className="block text-base hover:underline"
              >
                New Arrivals
              </Link>
              <Link
                href="/products"
                className="block text-base hover:underline"
              >
                On Sale
              </Link>
              <Link
                href="/products"
                className="block text-base hover:underline"
              >
                Brands
              </Link>
            </div>
          </div>
          <div className="w-full border-b border-gray-900 pb-4">
            <Link href="/about" className="block text-3xl hover:underline">
              About
            </Link>
          </div>
          {user ? (
            <div className="w-full pb-4">
              <a
                onClick={toggleCart}
                className="block text-3xl hover:underline"
              >
                Cart
              </a>
            </div>
          ) : (
            <div className="w-full pb-4">
              <Link href="/auth/login" className="block text-3xl hover:underline">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Cart Component */}
      {isCartOpen && user && (
        <div className="fixed w-full top-0 right-0 h-full sm:w-96 bg-gray-200 border-l border-gray-900 p-2 z-30">
          <button
            onClick={toggleCart}
            className="text-gray-900 focus:outline-none mb-4 pl-2 text-3xl"
          >
            ✕
          </button>
          <Cart userId={user._id} /> {/* Pass the userId prop */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
