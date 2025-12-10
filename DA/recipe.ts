import { Recipe, RecipeDB } from '../model/recipe';
import { connectDB } from './db';
import { ObjectId } from 'mongodb';

export async function saveRecipe(recipe: Omit<RecipeDB, '_id'>): Promise<RecipeDB> {
  const db = await connectDB();
  const result = await db.collection('recipes').insertOne(recipe);
  return { ...recipe, _id: result.insertedId };
}

export async function getRecipeById(id: string): Promise<RecipeDB | null> {
  const db = await connectDB();
  const doc = await db.collection('recipes').findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  const { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy } = doc;
  return { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy };
}

export async function getRecipesByUser(userId: string): Promise<RecipeDB[]> {
  const db = await connectDB();
  const docs = await db.collection('recipes').find({ createdBy: new ObjectId(userId) }).toArray();
  return docs.map((doc: any) => {
    const { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy } = doc;
    return { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy };
  });
}

export async function getRecipesByKitchenId(kitchenId: string): Promise<RecipeDB[]> {
  const db = await connectDB();
  const docs = await db.collection('recipes').find({ kitchenId: new ObjectId(kitchenId) }).toArray();
  return docs.map((doc: any) => {
    const { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy, kitchenId } = doc;
    return { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy, kitchenId };
  });
}

export async function deleteRecipeById(recipeId: string): Promise<boolean> {
  const db = await connectDB();
  const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(recipeId) });
  return result.deletedCount === 1;
}

export async function updateRecipe(id: string, payload: { name: string; steps: string[]; ingredients: string[] }): Promise<boolean> {
  const db = await connectDB();
  await db.collection('recipes').updateOne(
    { _id: new ObjectId(id) },
    { $set: { name: payload.name, steps: payload.steps, ingredients: payload.ingredients } }
  );
  return true;
}
