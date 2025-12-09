import { useState, useEffect, useRef } from 'react';
import type { UserResType, KitchenResType } from 'types/user.d';

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserResType | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  const [kitchen, setKitchen] = useState<KitchenResType | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('kitchen');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  // Prevent double fetch on mount (React Strict Mode or double render)
  const didFetch = useRef(false);

  const fetchUserAndKitchen = async () => {
    setLoading(true);
    setError(null);
    try {
      if (typeof window !== 'undefined') {
        const userStr = sessionStorage.getItem('user');
        const kitchenStr = sessionStorage.getItem('kitchen');
        if (userStr && kitchenStr) {
          const userObj = JSON.parse(userStr);
          const kitchenObj = JSON.parse(kitchenStr);
          setUser(userObj);
          setKitchen(kitchenObj);
          setLoading(false);
          return { user: userObj, kitchen: kitchenObj };
        }
      }
      const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://localhost:3001';
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No auth token found');
        setLoading(false);
        return false;
      }
      const res = await fetch(`${serverEndpoint}/api/user/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok && data.user && data.kitchen) {
        setUser(data.user);
        setKitchen(data.kitchen);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('user', JSON.stringify(data.user));
          sessionStorage.setItem('kitchen', JSON.stringify(data.kitchen));
        }
        setLoading(false);
        return { user: data.user, kitchen: data.kitchen };
      } else {
        setError('API failed');
        setLoading(false);
        return false;
      }
    } catch {
      setError('Network error');
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    if (!user || !kitchen) {
      if (!didFetch.current) {
        didFetch.current = true;
        fetchUserAndKitchen();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    kitchen,
    loading,
    error,
    fetchUserAndKitchen,
  };
}
