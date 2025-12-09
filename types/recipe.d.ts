import { LanguageCode } from '../utilities/language';

export interface RecipePayload {
  name: string;
  customIngredients?: string[];
  customInstructions?: string[];
  language: LanguageCode;
  people: number;
}

export interface GenerateRecipeResponse {
  ingredients: string[];
  cook_steps: string[];
}

export interface GenerateRecipeRequest {
  form: RecipePayload;
  lang: string;
}
