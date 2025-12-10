import type { GenerateRecipeRequest, GenerateRecipeResponse } from 'types/recipe';
import { useState } from 'react';
import { getToken } from './auth';

export function useGenerateRecipe() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GenerateRecipeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateRecipe = async (form: GenerateRecipeRequest['form'], lang: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const token = getToken();
      if (!token) {
        setError('No auth token found');
        setLoading(false);
        return;
      }
      const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://localhost:3001';
      const res = await fetch(`${serverEndpoint}/api/recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, language: lang })
      });
      const result = await res.json();
      if (result.success && result.recipe) {
        setData(result.recipe);
      } else {
        setError(result.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return { generateRecipe, data, loading, error };
}

export async function deleteRecipeById(recipeId: string): Promise<{ success: boolean; error?: string }> {
  const token = getToken();
  if (!token) {
    return { success: false, error: 'No auth token found' };
  }
  const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://localhost:3001';
  const res = await fetch(`${serverEndpoint}/api/recipe/${recipeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const result = await res.json();
  return result;
}

export async function updateRecipeById(recipeId: string, payload: { name: string; steps: string[]; ingredients: string[] }): Promise<{ success: boolean; error?: string }> {
  const token = getToken();
  if (!token) {
    return { success: false, error: 'No auth token found' };
  }
  const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://localhost:3001';
  const res = await fetch(`${serverEndpoint}/api/recipe/${recipeId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const result = await res.json();
  return result;
}

export type { GenerateRecipeResponse };
