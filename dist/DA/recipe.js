"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRecipe = saveRecipe;
exports.getRecipeById = getRecipeById;
exports.getRecipesByUser = getRecipesByUser;
exports.getRecipesByKitchenId = getRecipesByKitchenId;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
async function saveRecipe(recipe) {
    const db = await (0, db_1.connectDB)();
    const result = await db.collection('recipes').insertOne(recipe);
    return { ...recipe, _id: result.insertedId };
}
async function getRecipeById(id) {
    const db = await (0, db_1.connectDB)();
    const doc = await db.collection('recipes').findOne({ _id: new mongodb_1.ObjectId(id) });
    if (!doc)
        return null;
    const { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy } = doc;
    return { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy };
}
async function getRecipesByUser(userId) {
    const db = await (0, db_1.connectDB)();
    const docs = await db.collection('recipes').find({ createdBy: new mongodb_1.ObjectId(userId) }).toArray();
    return docs.map((doc) => {
        const { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy } = doc;
        return { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy };
    });
}
async function getRecipesByKitchenId(kitchenId) {
    const db = await (0, db_1.connectDB)();
    const docs = await db.collection('recipes').find({ kitchenId: new mongodb_1.ObjectId(kitchenId) }).toArray();
    return docs.map((doc) => {
        const { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy, kitchenId } = doc;
        return { _id, name, ingredients, steps, customIngredients, customInstructions, createdBy, kitchenId };
    });
}
//# sourceMappingURL=recipe.js.map