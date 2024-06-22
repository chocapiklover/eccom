/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios'; 
import { useAuthStore } from '../../context/userStore'; 
import OrderHistory from '../../components/profilePage/orderHistory';
import PersonalDetails from '../../components/profilePage/PersonalDetails';
import ShippingAddressForm from '../../components/profilePage/ShippingAddressForm';

interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface Order {
  _id: string;
  orderItems: {
    product: {
      _id: string;
      name: string;
      price: number;
      images: string[];
    };
    quantity: number;
    size: string;
  }[];
  totalPrice: number;
  paidAt: string;
}

interface UserData {
  name: string;
  email: string;
  shippingAddress?: ShippingAddress;
  orderHistory?: Order[];
}

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/profile`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleUpdate = async (updatedData: Partial<UserData>) => {
    try {
      const response = await axios.put(`/users/profile`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserData(response.data);
    } catch (err) {
      setError('Failed to update user data');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      {userData && (
        <>
          <PersonalDetails userData={userData} />
          <ShippingAddressForm 
            shippingAddress={userData.shippingAddress || {line1: '', line2: '', city: '', state: '', postal_code: '', country: ''}} 
            onUpdate={handleUpdate} 
          />
          <OrderHistory orders={userData.orderHistory || []} />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
