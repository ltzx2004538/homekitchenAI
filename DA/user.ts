import { connectDB } from './db';
import { User } from '../model/user';

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await connectDB();
  const user = await db.collection('users').findOne({ email });
  return user as User | null;
}
