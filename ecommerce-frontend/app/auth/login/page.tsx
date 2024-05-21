'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../../context/userStore'; // Ensure the path is correct

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data: IFormInput) => {
    try {
      // Sends login form to backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, data);
      console.log('Sent login form to backend');
      
      // Saves user info to Zustand store
      setUser(response.data);
      
      // Redirects user to home page
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email', { required: 'Email is required' })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input {...register('password', { required: 'Password is required' })} type="password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
