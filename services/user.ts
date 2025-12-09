import { connectDB } from '../DA/db';
import { User } from '../model/user';
import bcrypt from 'bcrypt';

async function createUserService(user: { firstname: string; lastname: string; email: string; password: string }): Promise<User> {
  const db = await connectDB();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: hashedPassword,
    type: 'user', // default type, can be changed if needed
    kitchenId: null // can be set later
  };
  const result = await db.collection('users').insertOne(newUser);
  return { _id: result.insertedId, ...newUser };
}

async function getUserByEmailService(email: string): Promise<User | null> {
  const db = await connectDB();
  const user = await db.collection('users').findOne({ email });
  return user as User | null;
}

export {
  createUserService,
  getUserByEmailService
};
