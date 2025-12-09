"use client";
import { useState } from 'react';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://localhost:3001';
      const res = await fetch(`${serverEndpoint}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!data.token) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return false;
      }
      localStorage.setItem('authToken', data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
      setLoading(false);
      return false;
    }
  };

  return { login, loading, error };
}
