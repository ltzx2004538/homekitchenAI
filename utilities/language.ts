export type LanguageCode = 'EN' | 'CN' | 'FR' | 'ES' | 'DE' | 'IT' | 'JP' | 'KR';

export const LANGUAGES: LanguageCode[] = [
  "EN", "CN", "FR", "ES", "DE", "IT", "JP", "KR"
];

export function getLanguage(code: LanguageCode): string {
  const languageTable: Record<LanguageCode, string> = {
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
