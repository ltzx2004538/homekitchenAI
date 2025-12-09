"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRootType = requireRootType;
const auth_1 = require("../services/auth");
async function requireRootType(req, res, next) {
    try {
        const user = await (0, auth_1.verifyJWTFromRequest)(req);
        console.log(user);
        if (!user || user.type !== 'ROOT') {
            return res.status(403).json({ error: 'Root access required' });
        }
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid or missing token' });
    }
}
//# sourceMappingURL=requireRootType.js.map