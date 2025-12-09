import { Db } from 'mongodb';
import { Kitchen } from '../model/kitchen';
import { connectDB } from '../DA/db';

export async function getKitchens(): Promise<Kitchen[]> {
  const db = await connectDB();
  const kitchens = await db.collection('kitchens').find().toArray();
  // Map to Kitchen type, filter out docs without name
  return kitchens.map((k: any) => ({ _id: k._id, name: k.name })).filter((k: any) => k.name);
}

export async function createKitchen(kitchen: { name: string }): Promise<Kitchen> {
  const db = await connectDB();
  const result = await db.collection('kitchens').insertOne({ name: kitchen.name });
  return { _id: result.insertedId, name: kitchen.name };
}
