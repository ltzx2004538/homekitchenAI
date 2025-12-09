"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kitchen_1 = require("../DA/kitchen");
const requireRootType_1 = require("../middleware/requireRootType");
const router = express_1.default.Router();
// GET /kitchen - get all kitchens
router.get('/', requireRootType_1.requireRootType, async (req, res) => {
    try {
        const kitchens = await (0, kitchen_1.getKitchens)();
        res.json(kitchens);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch kitchens' });
    }
});
// POST /kitchen - create a new kitchen
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name)
            return res.status(400).json({ error: 'name is required' });
        const kitchen = await (0, kitchen_1.createKitchen)({ name });
        res.status(201).json(kitchen);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create kitchen' });
    }
});
exports.default = router;
//# sourceMappingURL=kitchen.js.map