"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireKitchenUser = requireKitchenUser;
const auth_1 = require("../services/auth");
const user_1 = require("../DA/user");
async function getAuthenticatedUser(req) {
    const userPayload = await (0, auth_1.verifyJWTFromRequest)(req);
    if (!userPayload)
        return null;
    const user = await (0, user_1.getUserByEmail)(userPayload.email);
    return user || null;
}
async function requireAuth(req, res, next) {
    try {
        const user = await getAuthenticatedUser(req);
        if (!user) {
            return res.status(401).json({ error: "Authentication required or user not found" });
        }
        if (req.session) {
            req.session.user = user;
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid or missing token" });
    }
}
async function requireKitchenUser(req, res, next) {
    try {
        const user = await getAuthenticatedUser(req);
        if (!user) {
            return res.status(401).json({ error: "Authentication required or user not found" });
        }
        if (!user.kitchenId) {
            return res.status(403).json({ error: "User does not have a kitchen assigned" });
        }
        if (req.session) {
            req.session.user = user;
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid or missing token" });
    }
}
//# sourceMappingURL=requireAuth.js.map