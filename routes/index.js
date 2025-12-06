const express = require('express');
const router = express.Router();
const kitchenService = require('../services/kitchenService');

router.get('/status', (req, res) => {
  res.json({ success: true, message: 'API is running.' });
});

router.get('/recipes', (req, res) => {
  const recipes = kitchenService.getRecipes();
  res.json({ success: true, recipes });
});

module.exports = router;
