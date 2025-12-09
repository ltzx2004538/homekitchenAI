"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguage = getLanguage;
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