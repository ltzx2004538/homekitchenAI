"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfigurer = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtConfigurer {
    constructor(publicKey) {
        this.verifier = async (token) => {
            const pem = publicKey.trim();
            return jsonwebtoken_1.default.verify(token, pem, {
                algorithms: ["RS256"],
            });
        };
    }
}
exports.JwtConfigurer = JwtConfigurer;
//# sourceMappingURL=jwtConfigurer.js.map