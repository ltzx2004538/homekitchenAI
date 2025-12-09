"use client";
import { useEffect, useState } from 'react';
import AuthPage from './auth/page';
import HomePage from './home/HomePage';

export default function MainPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check localStorage for authToken after mount
    const checkAuth = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <HomePage /> : <AuthPage />;
}
