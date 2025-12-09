import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // This endpoint should be called from the frontend, which checks localStorage for authToken
  // The backend cannot access localStorage, so just return success: false
  return res.status(200).json({ success: false });
}
