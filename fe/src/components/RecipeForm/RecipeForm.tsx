"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RecipePayload } from 'sharedType/recipe';
import Button from '../Button/Button';
import { useGenerateRecipe } from '../../hooks/generateRecipeHook';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import MultiInput from '../MultiInput/MultiInput';
import TextInput from '../TextInput/TextInput';
import styles from './RecipeForm.module.scss';

export default function RecipeForm() {
  const router = useRouter();
  const [form, setForm] = useState<RecipePayload>({
    name: '',
    customIngredients: [],
    language: typeof window !== 'undefined' ? (window.localStorage.getItem('hkai_language') as RecipePayload['language']) || 'EN' : 'EN',
    people: 1,
    customInstructions: []
  });
  const { loading, result, error, generateRecipe } = useGenerateRecipe();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: RecipePayload) => ({ ...prev, [name]: name === 'people' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lang = typeof window !== 'undefined' ? window.localStorage.getItem('hkai_language') || 'EN' : 'EN';
    await generateRecipe(form, lang);
  };

  const isGenerateDisabled = React.useCallback(() => {
    return !form.name || loading || form.people < 1;
  }, [form.name, loading, form.people]);

  return (
    <div className={styles['recipe-page']}>
      <h1>AI Recipe Generator</h1>
      <form onSubmit={handleSubmit} className={styles['recipe-page__form']}>
        <TextInput
          label="Dish Name:"
          name="name"
          value={form.name}
          required
          className={styles['recipe-page__form__input']}
          onChange={handleChange}
        />
        <MultiInput
          label="Custom Ingredients:"
          values={form.customIngredients ?? []}
          onChange={newIngredients => setForm(prev => ({ ...prev, customIngredients: newIngredients }))}
          inputClassName={styles['recipe-page__form__input']}
        />
        <TextInput
          label="Number of People:"
          name="people"
          type="number"
          min={1}
          value={form.people}
          required
          className={styles['recipe-page__form__input']}
          onChange={handleChange}
        />
        <MultiInput
          label="Custom Instructions:"
          values={form.customInstructions ?? []}
          onChange={newInstructions => setForm(prev => ({ ...prev, customInstructions: newInstructions }))}
          inputClassName={styles['recipe-page__form__input']}
        />
        <Button
          type="submit"
          label="Generate Recipe"
          className={styles['recipe-page_buttons']}
          disabled={isGenerateDisabled()}
        />
      </form>
      {loading && <LoadingSpinner />}
      {error && <p className={styles.error}>{error}</p>}
      {result && (
        <div className={styles.result}>
          <h2>Ingredients</h2>
          <ul>
            {result.ingredients?.map((ing: string, idx: number) => <li key={idx}>{ing}</li>)}
          </ul>
          <h2>Cook Steps</h2>
          <ol>
            {result.cook_steps?.map((step: string, idx: number) => <li key={idx}>{step}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}
