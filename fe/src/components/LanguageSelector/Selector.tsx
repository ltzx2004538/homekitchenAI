import React from "react";
import type { LanguageCode } from "@/../../utilities/language";

interface SelectorProps {
  value: LanguageCode;
  items: LanguageCode[];
  getLabel: (code: LanguageCode) => string;
  onChange: (code: LanguageCode) => void;
}

export default function Selector({ value, items, getLabel, onChange }: SelectorProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as LanguageCode)}
      style={{ padding: "8px 16px", fontSize: 16, borderRadius: 6, marginTop: 16 }}
    >
      {items.map(code => (
        <option key={code} value={code}>
          {getLabel(code)}
        </option>
      ))}
    </select>
  );
}
