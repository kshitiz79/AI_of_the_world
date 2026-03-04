"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api';

export default function AuthGuard({ children, requireAdmin = false }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = authAPI.isAuthenticated();
      
      if (!isAuthenticated) {
        router.push('/signin');
        return;
      }

      if (requireAdmin) {
        const isAdmin = authAPI.isAdmin();
        if (!isAdmin) {
          router.push('/panel/your-dashboard');
          return;
        }
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, requireAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
