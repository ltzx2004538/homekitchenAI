"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = createUserService;
exports.getUserByEmailService = getUserByEmailService;
const db_1 = require("../DA/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUserService(user) {
    const db = await (0, db_1.connectDB)();
    const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
    const newUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
        type: 'user', // default type, can be changed if needed
        kitchenId: null // can be set later
    };
    const result = await db.collection('users').insertOne(newUser);
    return { _id: result.insertedId, ...newUser };
}
async function getUserByEmailService(email) {
    const db = await (0, db_1.connectDB)();
    const user = await db.collection('users').findOne({ email });
    return user;
}
//# sourceMappingURL=user.js.map