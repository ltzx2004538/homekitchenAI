import { LanguageCode } from "../utilities/language";

export interface RecipePayload {
  name: string;
  customIngredients?: string[];
  customInstructions?: string[];
  language: LanguageCode;
  people: number;
}

export interface GenerateRecipeResponse {
  _id: string;
  name: string;
  ingredients: string[];
  steps: string[];
}

export interface RecipeDetailData {
  _id: string;
  name: string;
  ingredients?: string[];
  steps?: string[];
}

export interface GenerateRecipeRequest {
  form: RecipePayload;
  lang: string;
}
