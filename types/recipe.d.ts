import { LanguageCode } from '../utilities/language';

export interface RecipePayload {
  name: string;
  customIngredients?: string[];
  customInstructions?: string[];
  language: LanguageCode;
  people: number;
}
