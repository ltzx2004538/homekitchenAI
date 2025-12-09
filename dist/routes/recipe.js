"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_1 = require("../services/recipe");
const requireAuth_1 = require("../middleware/requireAuth");
const router = (0, express_1.Router)();
router.post('/', requireAuth_1.requireKitchenUser, async (req, res) => {
    const body = req.body;
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
        const savedRecipe = await (0, recipe_1.generateRecipe)(body, user._id, user.kitchenId);
        res.json({ success: true, recipe: savedRecipe });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
router.get('/kitchen/:kitchenId', requireAuth_1.requireKitchenUser, async (req, res) => {
    const { kitchenId } = req.params;
    if (!kitchenId) {
        return res.status(400).json({ success: false, error: 'Missing kitchenId' });
    }
    try {
        const recipes = await (0, recipe_1.fetchRecipesByKitchenId)(kitchenId);
        res.json({ success: true, recipes });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=recipe.js.map