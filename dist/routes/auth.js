"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../services/auth");
const router = express_1.default.Router();
// POST /login - user login
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'email and password are required' });
        const result = await (0, auth_1.loginService)(email, password);
        if (!result)
            return res.status(401).json({ error: 'Invalid credentials' });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map