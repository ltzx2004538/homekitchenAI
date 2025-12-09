"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = getUserByEmail;
const db_1 = require("./db");
async function getUserByEmail(email) {
    const db = await (0, db_1.connectDB)();
    const user = await db.collection('users').findOne({ email });
    return user;
}
//# sourceMappingURL=user.js.map