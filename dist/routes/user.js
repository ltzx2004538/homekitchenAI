"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../services/user");
const requireRootType_1 = require("../middleware/requireRootType");
const requireAuth_1 = require("../middleware/requireAuth");
const router = express_1.default.Router();
// POST /user - create a new user
router.post('/', requireRootType_1.requireRootType, async (req, res) => {
    try {
        const { firstname, lastname, email, password, type, kitchenId } = req.body;
        if (!firstname || !lastname || !email || !password || !type || !kitchenId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Only pass allowed fields to createUserService
        const user = await (0, user_1.createUserService)({ firstname, lastname, email, password });
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
// GET /user/email/:email - get user by email
router.get('/email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await (0, user_1.getUserByEmailService)(email);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to get user' });
    }
});
// GET /user/me - get current user and kitchen data
router.get('/me', requireAuth_1.requireKitchenUser, async (req, res) => {
    try {
        const user = req.session.user;
        if (!user || !user.kitchenId) {
            return res.status(401).json({ error: 'User or kitchenId not found' });
        }
        // Get kitchen by user.kitchenId
        const db = await require('../DA/db').connectDB();
        const kitchen = await db.collection('kitchens').findOne({ _id: user.kitchenId });
        if (!kitchen) {
            return res.status(404).json({ error: 'Kitchen not found' });
        }
        // Only return selected user fields
        const userData = {
            id: user._id,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            type: user.type
        };
        res.json({ success: true, user: userData, kitchen });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to get user and kitchen' });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map