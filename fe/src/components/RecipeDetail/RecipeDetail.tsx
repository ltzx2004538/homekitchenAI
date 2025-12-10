import React from "react";
import styles from "./RecipeDetail.module.scss";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import TextInput from "../TextInput/TextInput";
import { updateRecipeById } from "@/hooks/recipe";

export interface RecipeDetailData {
  _id: string;
  name: string;
  ingredients?: string[];
  steps?: string[];
}

interface RecipeDetailProps {
  data: RecipeDetailData | null;
  onBack?: () => void;
  backText?: string;
  onUpdate?: (updated: RecipeDetailData) => void;
  editOnOpen?: boolean;
  onEditModeChange?: (edit: boolean) => void;
}

export default function RecipeDetail({
  data,
  onBack,
  backText,
  onUpdate,
  editOnOpen = false,
  onEditModeChange,
}: RecipeDetailProps) {
  const [isEditMode, setIsEditMode] = React.useState(editOnOpen);
  const [localData, setLocalData] = React.useState({
    name: data?.name || "",
    ingredients: data?.ingredients || [],
    steps: data?.steps || [],
  });

  const [ingredientsEdit, setIngredientsEdit] = React.useState<string>(localData.ingredients.join(", "));

  React.useEffect(() => {
    setIsEditMode(editOnOpen);
  }, [editOnOpen]);

  React.useEffect(() => {
    if (onEditModeChange) onEditModeChange(isEditMode);
  }, [isEditMode, onEditModeChange]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEditOrSubmit = React.useCallback(async () => {
    if (isEditMode) {
      // Submit logic: call update API, log result, and switch back
      if (data?._id) {
        const payload = {
          _id: data._id,
          name: localData.name,
          ingredients: ingredientsEdit.split(",").map(i => i.trim()).filter(Boolean),
          steps: localData.steps,
        };
        const res = await updateRecipeById(data._id, payload);
        console.log("RecipeDetail submit:", payload, "API result:", res);
        if (res.success && onUpdate) {
          onUpdate(payload);
        }
      }
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  }, [isEditMode, localData, ingredientsEdit, data, onUpdate]);

  const renderTitle = React.useCallback(() => {
    if (isEditMode) {
      return (
        <TextInput
          label=""
          name="dishname"
          value={localData.name}
          onChange={handleNameChange}
          className={styles["recipe-detail__title-input"]}
        />
      );
    }
    return (
      <span className={styles["recipe-detail__title"]}> {localData.name}</span>
    );
  }, [isEditMode, localData.name]);

  const renderIngredients = React.useCallback(() => {
    if (!data) return null;
    if (isEditMode) {
      return (
        <TextField
          value={ingredientsEdit}
          onChange={setIngredientsEdit}
          className={styles["recipe-detail__ingredients-textfield"]}
          rows={6}
          placeholder="Enter ingredients, separated by commas"
        />
      );
    }
    return (
      <span className={styles["recipe-detail__ingredients-text"]}>
        {data.ingredients?.join(", ")}
      </span>
    );
  }, [isEditMode, ingredientsEdit, data]);

  if (!data) return null;
  return (
    <div className={styles["recipe-detail"]}>
      {renderTitle()}
      <div className={styles["recipe-detail__top"]}>
        <h2 className={styles["recipe-detail__subtitle"]}>Ingredients:</h2>
        <div className={styles["recipe-detail__ingredients"]}>
          {renderIngredients()}
        </div>
        <h2 className={styles["recipe-detail__subtitle"]}>Cook Steps:</h2>
        <ol className={styles["recipe-detail__steps"]}>
          {data.steps?.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
      <div className={styles["recipe-detail__bot"]}>
        <Button
          onClick={handleEditOrSubmit}
          className={styles["recipe-detail__btn"]}
          label={isEditMode ? "Submit" : "Edit"}
        />
        {onBack && (
          <Button
            onClick={onBack}
            className={styles["recipe-detail__btn"]}
            label={backText || "Back to table"}
          />
        )}
      </div>
    </div>
  );
}
