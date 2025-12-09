import express from 'express';
import { loginService } from '../services/login';

const router = express.Router();

// POST /login - user login
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
    const result = await loginService(email, password);
	console.log(result)
    if (!result) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
