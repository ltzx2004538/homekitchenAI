"use client";
import React, { useState } from 'react';
import { RecipePayload } from 'sharedType/recipe';
import Button from '../Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import MultiInput from '../MultiInput/MultiInput';
import TextInput from '../TextInput/TextInput';
import styles from './RecipeForm.module.scss';
import { useGenerateRecipe, GenerateRecipeResponse } from '../../hooks/recipe';
import PageLayout from "@/components/PageLayout/PageLayout";

export default function RecipeForm({ onResult }: { onResult?: (data: GenerateRecipeResponse) => void }) {
  const [form, setForm] = useState<RecipePayload>({
    name: '',
    customIngredients: [],
    language: typeof window !== 'undefined' ? (window.localStorage.getItem('language') as RecipePayload['language']) || 'EN' : 'EN',
    people: 1,
    customInstructions: []
  });
  const { generateRecipe, data, loading: isLoading, error } = useGenerateRecipe();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: RecipePayload) => ({ ...prev, [name]: name === 'people' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lang = typeof window !== 'undefined' ? window.localStorage.getItem('language') || 'EN' : 'EN';
    await generateRecipe(form, lang);
  };

  const isGenerateDisabled = React.useCallback(() => {
    return !form.name || isLoading || form.people < 1;
  }, [form.name, isLoading, form.people]);

  React.useEffect(() => {
    if (data && onResult) onResult(data);
  }, [data, onResult]);

  return (
    <PageLayout title="AI Recipe Generator" className={styles['recipe-page']}>
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
      {isLoading && <LoadingSpinner />}
      {error && <p className={styles.error}>{error}</p>}
    </PageLayout>
  );
}
