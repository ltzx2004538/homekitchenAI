"use client";
import React, { useEffect, useMemo, useCallback } from "react";
import { useUser } from "@/hooks/user";
import { useFavoriteRecipes } from "@/hooks/favoriteRecipes";
import { deleteRecipeById } from "@/hooks/recipe";
import Table from "@/components/Table/Table";
import Icon from "@/components/Icon/Icon";
import RecipeDetail from "@/components/RecipeDetail/RecipeDetail";
import styles from "@styles/Pages/Favorites.module.scss";
import PageLayout from "@/components/PageLayout/PageLayout";
import { RecipeDetailData } from "sharedType/recipe";

export default function FavoritesPage() {
  const { kitchen } = useUser();
  const kitchenId = kitchen?._id || null;
  const { recipes, loading, error } = useFavoriteRecipes(kitchenId);
  const [localRecipes, setLocalRecipes] = React.useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = React.useState<RecipeDetailData | null>(null);
  const [showDetail, setShowDetail] = React.useState(false);
  const [editOnOpen, setEditOnOpen] = React.useState(false);

  useEffect(() => {
    setLocalRecipes(recipes);
  }, [recipes]);

  const handleDelete = useCallback(
    async (id: string) => {
      const res = await deleteRecipeById(id);
      if (res.success) {
        setLocalRecipes((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert(res.error || "Delete failed");
      }
    },
    [setLocalRecipes]
  );

  const handleUpdate = (updated: RecipeDetailData) => {
    setLocalRecipes((prev) => prev.map(r => r._id === updated._id ? { ...r, ...updated } : r));
    setSelectedRecipe(updated);
  };

  const handleRowClick = (row: RecipeDetailData) => {
    setSelectedRecipe(row);
    setShowDetail(true);
  };

  const handleEditClick = (row: RecipeDetailData) => {
    setSelectedRecipe(row);
    setShowDetail(true);
    setEditOnOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Name",
        flex: 2,
        render: (row: { name: string }, idx: number) =>
          `${idx + 1}. ${row.name}`,
      },
      {
        key: "edit",
        label: "Edit",
        flex: 1,
        render: (row: RecipeDetailData) => (
          <span
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleEditClick(row);
            }}
          >
            <Icon
              name="edit"
              title="Edit"
              styleType="default"
            />
          </span>
        ),
      },
      {
        key: "delete",
        label: "Delete",
        flex: 1,
        render: (row: { _id: string }) => (
          <span
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
          >
            <Icon
              name="delete"
              title="Delete"
              styleType="delete"
            />
          </span>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <PageLayout title="Favorite Recipes" className={styles["favorites-page"]}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles["favorites-page__table"]}>
        {showDetail && selectedRecipe ? (
          <RecipeDetail
            data={selectedRecipe}
            onBack={() => { setShowDetail(false); setSelectedRecipe(null); setEditOnOpen(false); }}
            backText="Back to table"
            onUpdate={handleUpdate}
            editOnOpen={editOnOpen}
            onEditModeChange={setEditOnOpen}
          />
        ) : (
          <Table
            data={localRecipes}
            columns={columns}
            onRowClick={handleRowClick}
          />
        )}
      </div>
    </PageLayout>
  );
}
