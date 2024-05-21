'use client';

import { useUserStore } from '../context/userStore'; // Ensure the path is correct

export default function Home() {
  const { user, logout } = useUserStore();

  return (
    <div>
      <h1>Welcome, {user ? user.name : 'Guest'}</h1>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <p>Please log in to see your details.</p>
      )}
    </div>
  );
}
