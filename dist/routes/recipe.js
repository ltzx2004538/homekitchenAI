"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_1 = require("../services/recipe");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const { name, customIngredients, language, people, customInstructions } = req.body;
    if (!name || !people) {
        return res.status(400).json({ success: false, error: 'Missing name or people' });
    }
    try {
        const recipe = await (0, recipe_1.getRecipeFromAI)({ name, customIngredients, language, people, customInstructions });
        res.json({ success: true, recipe });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=recipe.js.map