'use client'

import { useState, useEffect } from 'react';
import { useAuthStore } from '../../context/userStore';
import { useRouter } from 'next/navigation';
import axios from '../../utils/axios';

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect to the login page if not authenticated
    }
  }, [user, router]);

  if (!user) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Name:</label>
          <p className="p-2 border rounded">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Email:</label>
          <p className="p-2 border rounded">{user.email}</p>
        </div>
        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;