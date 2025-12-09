"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_1 = __importDefault(require("./recipe"));
const kitchen_1 = __importDefault(require("./kitchen"));
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.get('/status', (req, res) => {
    res.json({ success: true, message: 'API is running.' });
});
router.use('/recipe', recipe_1.default);
router.use('/kitchen', kitchen_1.default);
router.use('/login', auth_1.default);
router.use('/user', user_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map