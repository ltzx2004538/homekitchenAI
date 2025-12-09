import express from 'express';
import {createUserService,getUserByEmailService} from '../services/user';
import { requireRootType } from '../middleware/requireRootType';

const router = express.Router();

// POST /user - create a new user
router.post('/', requireRootType, async (req, res) => {
  try {
    const { firstname, lastname, email, password, type, kitchenId } = req.body;
    if (!firstname || !lastname || !email || !password || !type || !kitchenId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Only pass allowed fields to createUserService
    const user = await createUserService({ firstname, lastname, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// GET /user/email/:email - get user by email
router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmailService(email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});

export default router;
