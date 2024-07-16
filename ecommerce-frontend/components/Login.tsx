/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { useAuthStore } from '../context/userStore';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex">
  <div className="w-1/2 flex items-center justify-center">
    <div className="w-3/4 p-8 bg-white">
      <h2 className="text-3xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g dimas@company.com"
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-black text-white rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Not a member yet? <a href="register" className="text-blue-500">Sign Up</a>
      </p>
    </div>
  </div>
  <div className="w-1/2">
    <img src="https://i.etsystatic.com/32268171/r/il/93a9b5/3753280368/il_fullxfull.3753280368_m2m1.jpg" alt="Two people smiling" className="object-cover h-full w-full" />
  </div>
</div>
  );
};

export default Login;
