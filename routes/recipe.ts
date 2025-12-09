import { Router } from 'express';
import { getRecipeFromAI } from '../services/recipe';

const router = Router();

router.post('/', async (req, res) => {
  const { name, customIngredients, language, people, customInstructions } = req.body;
  if (!name || !people) {
    return res.status(400).json({ success: false, error: 'Missing name or people' });
  }
  try {
    const recipe = await getRecipeFromAI({ name, customIngredients, language, people, customInstructions});
    res.json({ success: true, recipe });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
