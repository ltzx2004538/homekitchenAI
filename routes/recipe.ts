import { Router } from 'express';
import { generateRecipe, fetchRecipesByKitchenId, deleteRecipe, updateRecipe } from '../services/recipe';
import { RecipePayload } from '../types/recipe';
import { requireKitchenUser } from '../middleware/requireAuth';

const router = Router();

router.post('/', requireKitchenUser, async (req, res) => {
  const body: RecipePayload = req.body;
  if (!body.name || !body.people) {
    return res.status(400).json({ success: false, error: 'Missing name or people' });
  }
  try {
    const user = req.session.user;
    if (!user || !user._id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    if (!user.kitchenId) {
      return res.status(400).json({ success: false, error: 'User does not have a kitchenId' });
    }
    // Optionally, verify kitchenId belongs to user (if needed, fetch kitchen and check owner)
    const savedRecipe = await generateRecipe(body, user._id, user.kitchenId);
    res.json({ success: true, recipe: savedRecipe });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/kitchen/:kitchenId', requireKitchenUser, async (req, res) => {
  const { kitchenId } = req.params;
  if (!kitchenId) {
    return res.status(400).json({ success: false, error: 'Missing kitchenId' });
  }
  try {
    const recipes = await fetchRecipesByKitchenId(kitchenId);
    res.json({ success: true, recipes });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/:id', requireKitchenUser, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, error: 'Missing recipe id' });
  }
  try {
    const deleted = await deleteRecipe(id);
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Recipe not found' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/:id', requireKitchenUser, async (req, res) => {
  const { id } = req.params;
  const { name, steps, ingredients } = req.body;
  if (!id || !name || !Array.isArray(steps) || !Array.isArray(ingredients)) {
    return res.status(400).json({ success: false, error: 'Missing or invalid fields' });
  }
  try {
    const success = await updateRecipe(id, { name, steps, ingredients });
    res.json({ success });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
