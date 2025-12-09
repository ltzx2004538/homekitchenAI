"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfigurer = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtConfigurer {
    constructor(publicKey) {
        // Clean up the public key string
        const publicKeyContent = publicKey
            .replace('-----BEGIN PUBLIC KEY-----', '')
            .replace('-----END PUBLIC KEY-----', '')
            .replace(/\n/g, '')
            .replace(/\s+/g, '');
        // Reconstruct PEM format
        const pem = `-----BEGIN PUBLIC KEY-----\n${publicKeyContent.match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----`;
        // Create a verify function using jsonwebtoken
        this.verifier = async (token) => {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, pem, { algorithms: ['RS256'] }, (err, decoded) => {
                    if (err)
                        return reject(err);
                    resolve(decoded);
                });
            });
        };
    }
}
exports.JwtConfigurer = JwtConfigurer;
//# sourceMappingURL=jwtConfigurer.js.map