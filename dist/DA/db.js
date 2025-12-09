"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongodb_1 = require("mongodb");
const DB_URL = process.env.DB_URL || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'homekitchen';
const DB_USERNAME = process.env.DB_USERNAME || 'adminUser';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}?authSource=admin`;
let client;
let db;
async function connectDB() {
    if (!client) {
        client = new mongodb_1.MongoClient(uri);
        await client.connect();
        db = client.db(DB_NAME);
    }
    return db;
}
//# sourceMappingURL=db.js.map