import { Router } from 'express';
import recipeRoutes from './recipe';
import kitchenRoutes from './kitchen';
import loginRoutes from './auth';
import userRoutes from './user';

const router = Router();

router.get('/status', (req, res) => {
  res.json({ success: true, message: 'API is running.' });
});

router.use('/recipe', recipeRoutes);
router.use('/kitchen', kitchenRoutes);
router.use('/login', loginRoutes);
router.use('/user', userRoutes);

export default router;
