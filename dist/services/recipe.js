"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRecipe = generateRecipe;
exports.fetchRecipesByKitchenId = fetchRecipesByKitchenId;
exports.getRecipeFromAI = getRecipeFromAI;
const openai_1 = require("openai");
const dotenv_1 = require("dotenv");
const language_1 = require("../utilities/language");
const recipeDA = __importStar(require("../DA/recipe"));
(0, dotenv_1.config)();
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
async function getRecipeFromAI(payload) {
    const { name, customIngredients, language, people, customInstructions } = payload;
    if (!name || !language || !people) {
        throw new Error('Missing required key(s): name, language, people');
    }
    const lang = (0, language_1.getLanguage)(language);
    let customText = Array.isArray(customInstructions) && customInstructions.length > 0
        ? ` Custom instructions: ${customInstructions.join(' ')}.`
        : "";
    let customIngText = Array.isArray(customIngredients) && customIngredients.length > 0
        ? ` Use these custom ingredients: ${customIngredients.join(', ')}.`
        : "";
    const prompt = `Generate a recipe for ${name} for ${people} people.${customText}${customIngText} Respond ONLY in ${lang}. Format the response as JSON with two keys: 'ingredients' (array of strings) and 'cook_steps' (array of strings, step by step instructions). Do not include any English or other language.`;
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful chef assistant. Always respond in ${lang}.` },
            { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 512,
    });
    let recipe;
    let rawContent = completion.choices[0].message.content ?? '';
    // Remove code block markers and trim whitespace
    let cleaned = rawContent.replace(/^```json|^```|```$/g, '').trim();
    try {
        recipe = JSON.parse(cleaned);
    }
    catch (e) {
        console.error('OpenAI raw response:', rawContent);
        throw new Error("OpenAI response is not valid JSON.");
    }
    return recipe;
}
async function generateRecipe(payload, userId, kitchenId) {
    const aiRecipe = await getRecipeFromAI(payload);
    const recipeToSave = {
        name: payload.name,
        ingredients: aiRecipe.ingredients,
        steps: aiRecipe.cook_steps,
        customIngredients: payload.customIngredients,
        customInstructions: payload.customInstructions,
        createdBy: userId,
        kitchenId
    };
    return await recipeDA.saveRecipe(recipeToSave);
}
async function fetchRecipesByKitchenId(kitchenId) {
    return await recipeDA.getRecipesByKitchenId(kitchenId);
}
//# sourceMappingURL=recipe.js.map