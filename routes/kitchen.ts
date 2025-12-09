import express from 'express';
import { getKitchens, createKitchen } from '../DA/kitchen';
import { requireRootType } from '../middleware/requireRootType';

const router = express.Router();

// GET /kitchen - get all kitchens
router.get('/', requireRootType, async (req, res) => {
  try {
    const kitchens = await getKitchens();
    res.json(kitchens);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch kitchens' });
  }
});

// POST /kitchen - create a new kitchen
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const kitchen = await createKitchen({ name });
    res.status(201).json(kitchen);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create kitchen' });
  }
});

export default router;
