import { config } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectDB } from "../DA/db";
import { User } from "../model/user";
import { JwtConfigurer } from "../utilities/jwtConfigurer";

config();

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY?.replace(/\n/g, "\n");

export async function loginService(
  email: string,
  password: string
): Promise<{ token: string } | null> {
  const db = await connectDB();
  const user = await db.collection("users").findOne({ email });
  if (!user) return null;
  // In production, use hashed passwords! Here, compare plain text for demo
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return null;
  if (!process.env.JWT_PRIVATE_KEY || !process.env.JWT_PUBLIC_KEY)
    throw new Error("JWT keys not set");
  // Clean up the private key string (remove header/footer and whitespace, then base64 decode)
  const rawPem = process.env.JWT_PRIVATE_KEY;
  if (!rawPem) throw new Error("JWT_PRIVATE_KEY not set");
  const privateKeyContent = rawPem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const privateKeyBuffer = Buffer.from(privateKeyContent, 'base64');
  const privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKeyContent.match(/.{1,64}/g)?.join('\n')}\n-----END PRIVATE KEY-----`;
  let token: string;
  try {
    token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        type: user.type
      },
      privateKey,
      { algorithm: "RS256", expiresIn: "7d" }
    );
  } catch (err) {
	console.log(err)
    throw new Error("JWT signing failed: " + (err instanceof Error ? err.message : String(err)));
  }
  return { token };
}
