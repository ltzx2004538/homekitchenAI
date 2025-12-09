"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKitchens = getKitchens;
exports.createKitchen = createKitchen;
const db_1 = require("../DA/db");
async function getKitchens() {
    const db = await (0, db_1.connectDB)();
    const kitchens = await db.collection('kitchens').find().toArray();
    // Map to Kitchen type, filter out docs without name
    return kitchens.map((k) => ({ _id: k._id, name: k.name })).filter((k) => k.name);
}
async function createKitchen(kitchen) {
    const db = await (0, db_1.connectDB)();
    const result = await db.collection('kitchens').insertOne({ name: kitchen.name });
    return { _id: result.insertedId, name: kitchen.name };
}
//# sourceMappingURL=kitchen.js.map