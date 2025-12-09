import { Request, Response, NextFunction } from 'express';
import { verifyJWTFromRequest } from '../services/auth';

export async function requireRootType(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await verifyJWTFromRequest(req);
	console.log(user)
    if (!user || user.type !== 'ROOT') {
      return res.status(403).json({ error: 'Root access required' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }
}
