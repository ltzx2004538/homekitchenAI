"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipeFromAI = getRecipeFromAI;
const openai_1 = require("openai");
const dotenv_1 = require("dotenv");
const language_1 = require("../utilities/language");
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
//# sourceMappingURL=recipe.js.map