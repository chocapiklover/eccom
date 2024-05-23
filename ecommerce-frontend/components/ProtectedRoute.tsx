import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../context/userStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;