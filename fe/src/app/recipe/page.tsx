"use client";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import RecipeDetail from "../../components/RecipeDetail/RecipeDetail";
import React, { useState } from "react";
import type { GenerateRecipeResponse } from "../../hooks/recipe";
import styles from "@styles/Pages/Recipe.module.scss";

export default function RecipePage() {
  const [recipeData, setRecipeData] = useState<GenerateRecipeResponse | null>(
    null
  );
  const [showForm, setShowForm] = useState(true);

  const handleResult = (data: GenerateRecipeResponse) => {
    setRecipeData(data);
    setShowForm(false);
  };

  const handleBackToForm = () => {
    setShowForm(true);
  };

  return (
    <div className={styles["recipe-detail-page"]}>
      {showForm ? (
        <RecipeForm onResult={handleResult} />
      ) : (
        <div className={styles["recipe-detail-page__detail"]}>
          <RecipeDetail
            data={recipeData}
            onBack={handleBackToForm}
            backText="Back to form"
          />
        </div>
      )}
    </div>
  );
}
