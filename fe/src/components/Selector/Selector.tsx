import React from "react";
import type { LanguageCode } from "@/../../utilities/language";

interface SelectorProps {
  label: string;
  value: LanguageCode;
  items: LanguageCode[];
  getLabel: (code: LanguageCode) => string;
  onChange: (code: LanguageCode) => void;
  direction?: "row" | "col";
  className?: string;
}

export default function Selector({ label, value, items, getLabel, onChange, direction = "row", className = "" }: SelectorProps) {
  return (
    <div className={["selector", direction === "row" ? "selector__left" : "selector__right", className].filter(Boolean).join(" ")}
      style={{ display: "flex", flexDirection: direction === "row" ? "row" : "column", alignItems: "center", gap: 8 }}
    >
      <label style={{ marginRight: direction === "row" ? 8 : 0, marginBottom: direction === "col" ? 8 : 0 }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value as LanguageCode)}
        style={{ padding: "8px 16px", fontSize: 16, borderRadius: 6 }}
      >
        {items.map(code => (
          <option key={code} value={code}>
            {getLabel(code)}
          </option>
        ))}
      </select>
    </div>
  );
}
