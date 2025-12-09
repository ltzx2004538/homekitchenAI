import { useState } from 'react';
import { RecipePayload } from 'sharedType/recipe';

export function useGenerateRecipe() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ingredients: string[]; cook_steps: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://localhost:3001';

  const generateRecipe = async (form: RecipePayload, lang: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${serverEndpoint}/api/recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language: lang })
      });
      const data = await res.json();
      if (data.success) setResult(data.recipe);
      else setError(data.error || 'Unknown error');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, error, generateRecipe };
}
