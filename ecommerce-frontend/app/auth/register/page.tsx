'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation'

interface IFormInput {
    name: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, data);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-2xl mb-4 text-center">Register</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                id="name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                {...register('email', { required: 'Email is required' })}
                id="email"
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                {...register('password', { required: 'Password is required' })}
                id="password"
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
          </form>
        </div>
      );
    };
    
    export default Register;