"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = loginService;
exports.verifyJWTFromRequest = verifyJWTFromRequest;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../DA/db");
(0, dotenv_1.config)();
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY?.replace(/\n/g, "\n");
async function loginService(email, password) {
    const db = await (0, db_1.connectDB)();
    const user = await db.collection("users").findOne({ email });
    if (!user)
        return null;
    // In production, use hashed passwords! Here, compare plain text for demo
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        return null;
    if (!process.env.JWT_PRIVATE_KEY || !process.env.JWT_PUBLIC_KEY)
        throw new Error("JWT keys not set");
    // Clean up the private key string (remove header/footer and whitespace, then base64 decode)
    const rawPem = process.env.JWT_PRIVATE_KEY;
    if (!rawPem)
        throw new Error("JWT_PRIVATE_KEY not set");
    const privateKeyContent = rawPem
        .replace(/-----BEGIN PRIVATE KEY-----/, "")
        .replace(/-----END PRIVATE KEY-----/, "")
        .replace(/\s+/g, "");
    const privateKeyBuffer = Buffer.from(privateKeyContent, 'base64');
    const privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKeyContent.match(/.{1,64}/g)?.join('\n')}\n-----END PRIVATE KEY-----`;
    let token;
    try {
        token = jsonwebtoken_1.default.sign({
            _id: user._id,
            email: user.email,
            type: user.type
        }, privateKey, { algorithm: "RS256", expiresIn: "7d" });
    }
    catch (err) {
        throw new Error("JWT signing failed: " + (err instanceof Error ? err.message : String(err)));
    }
    return {
        success: true,
        token
    };
}
async function verifyJWTFromRequest(req) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.replace('Bearer ', '').trim();
    const rawPem = process.env.JWT_PUBLIC_KEY;
    if (!rawPem)
        throw new Error('JWT_PUBLIC_KEY not set');
    // Clean up and reconstruct PEM
    const publicKeyContent = rawPem
        .replace(/-----BEGIN PUBLIC KEY-----/, "")
        .replace(/-----END PUBLIC KEY-----/, "")
        .replace(/\s+/g, "");
    const publicKey = `-----BEGIN PUBLIC KEY-----\n${publicKeyContent.match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----`;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ['RS256'] });
        if (decoded && decoded.email && decoded.type) {
            return { email: decoded.email, type: decoded.type };
        }
        return null;
    }
    catch (err) {
        return null;
    }
}
//# sourceMappingURL=auth.js.map