"use client";
import { useState, useEffect } from "react";

export interface Recipe {
  _id: string;
  name: string;
  ingredients: string[];
  steps: string[];
  customIngredients: string[];
  customInstructions: string[] | null;
  createdBy: string;
  kitchenId: string;
}

export function useFavoriteRecipes(kitchenId: string | null) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT || "http://localhost:3001"}/api/recipe/kitchen/${kitchenId}`,
        {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        }
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.recipes)) {
        setRecipes(data.recipes);
      } else {
        setError("Failed to fetch recipes");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!kitchenId) return;
    setRecipes([]); // reset recipes on kitchenId change
    setError(null);
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kitchenId]);

  return { recipes, loading, error };
}
