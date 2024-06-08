'use client'

import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios'; 
import { useAuthStore } from '../../context/userStore'; 
import PersonalInformation from '../../components/PersonalInfo';

interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface UserData {
  name: string;
  email: string;
  shippingAddress?: ShippingAddress;
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

  const handleUpdate = async (updatedData: UserData) => {
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
      {userData && <PersonalInformation userData={userData} onUpdate={handleUpdate} />}
    </div>
  );
};

export default ProfilePage;