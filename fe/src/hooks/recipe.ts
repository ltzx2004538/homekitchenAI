import type { GenerateRecipeRequest, GenerateRecipeResponse } from 'types/recipe.d';
import { useState } from 'react';

export function useGenerateRecipe() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GenerateRecipeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateRecipe = async (form: GenerateRecipeRequest['form'], lang: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://localhost:3001';
      const res = await fetch(`${serverEndpoint}/api/recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
