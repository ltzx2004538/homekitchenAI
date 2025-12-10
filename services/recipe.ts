import { OpenAI } from "openai";
import { RecipePayload } from "../types/recipe";
import { config } from "dotenv";
import { getLanguage } from "../utilities/language";
import * as recipeDA from '../DA/recipe';
import { RecipeDB } from '../model/recipe';
import { updateRecipe as updateRecipeDA } from '../DA/recipe';

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getRecipeFromAI(payload: RecipePayload) {
  const { name, customIngredients, language, people, customInstructions } = payload;
  if (!name || !language || !people) {
    throw new Error('Missing required key(s): name, language, people');
  }

  const lang = getLanguage(language);
  let customText = Array.isArray(customInstructions) && customInstructions.length > 0
    ? ` Custom instructions: ${customInstructions.join(' ')}.`
    : "";
  let customIngText = Array.isArray(customIngredients) && customIngredients.length > 0
    ? ` Use these custom ingredients: ${customIngredients.join(', ')}.`
    : "";
  const prompt = `Generate a recipe for ${name} for ${people} people.${customText}${customIngText} Respond ONLY in ${lang}. Format the response as JSON with two keys: 'ingredients' (array of strings, each string in the format "ingredient_name weight_g" if known, e.g. "spaghetti 200g"; if weight is unknown, just use the ingredient name), and 'cook_steps' (array of strings, step by step instructions). Do not include any English or other language.`;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `You are a helpful chef assistant. Always respond in ${lang}.` },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 512,
  });
  let recipe;
  let rawContent = completion.choices[0].message.content ?? '';
  // Remove code block markers and trim whitespace
  let cleaned = rawContent.replace(/^```json|^```|```$/g, '').trim();
  try {
    recipe = JSON.parse(cleaned);
  } catch (e) {
    console.error('OpenAI raw response:', rawContent);
    throw new Error("OpenAI response is not valid JSON.");
  }
  return recipe;
}

export async function generateRecipe(payload: RecipePayload, userId: string, kitchenId: string): Promise<RecipeDB> {
  const aiRecipe = await getRecipeFromAI(payload);
  const recipeToSave: Omit<RecipeDB, '_id'> = {
    name: payload.name,
    ingredients: aiRecipe.ingredients,
    steps: aiRecipe.cook_steps,
    customIngredients: payload.customIngredients,
    customInstructions: payload.customInstructions,
    createdBy: userId,
    kitchenId
  };
  return await recipeDA.saveRecipe(recipeToSave);
}

export async function fetchRecipesByKitchenId(kitchenId: string): Promise<RecipeDB[]> {
  return await recipeDA.getRecipesByKitchenId(kitchenId);
}

export async function deleteRecipe(recipeId: string): Promise<boolean> {
  return await recipeDA.deleteRecipeById(recipeId);
}

export async function updateRecipe(id: string, payload: { name: string; steps: string[]; ingredients: string[] }): Promise<boolean> {
  return await updateRecipeDA(id, payload);
}

export { getRecipeFromAI };
