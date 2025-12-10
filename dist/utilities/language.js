"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGUAGES = void 0;
exports.getLanguage = getLanguage;
exports.LANGUAGES = [
    "EN", "CN", "FR", "ES", "DE", "IT", "JP", "KR"
];
function getLanguage(code) {
    const languageTable = {
        EN: 'English',
        CN: 'Chinese',
        FR: 'French',
        ES: 'Spanish',
        DE: 'German',
        IT: 'Italian',
        JP: 'Japanese',
        KR: 'Korean',
    };
    return languageTable[code] || 'English';
}
//# sourceMappingURL=language.js.map