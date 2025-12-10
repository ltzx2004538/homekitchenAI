"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRecipe = saveRecipe;
exports.getRecipeById = getRecipeById;
exports.getRecipesByUser = getRecipesByUser;
exports.getRecipesByKitchenId = getRecipesByKitchenId;
exports.deleteRecipeById = deleteRecipeById;
exports.updateRecipe = updateRecipe;
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
async function deleteRecipeById(recipeId) {
    const db = await (0, db_1.connectDB)();
    const result = await db.collection('recipes').deleteOne({ _id: new mongodb_1.ObjectId(recipeId) });
    return result.deletedCount === 1;
}
async function updateRecipe(id, payload) {
    const db = await (0, db_1.connectDB)();
    await db.collection('recipes').updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: payload.name, steps: payload.steps, ingredients: payload.ingredients } });
    return true;
}
//# sourceMappingURL=recipe.js.map