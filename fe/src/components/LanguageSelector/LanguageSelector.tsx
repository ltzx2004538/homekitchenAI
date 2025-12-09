import React from "react";
import { LanguageCode, getLanguage } from "@/../../utilities/language";

interface LanguageSelectorProps {
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
}

const languageOptions: LanguageCode[] = [
  "EN", "CN", "FR", "ES", "DE", "IT", "JP", "KR"
];

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as LanguageCode)}
      style={{ padding: "8px 16px", fontSize: 16, borderRadius: 6, marginTop: 16 }}
    >
      {languageOptions.map(code => (
        <option key={code} value={code}>
          {getLanguage(code)}
        </option>
      ))}
    </select>
  );
}
