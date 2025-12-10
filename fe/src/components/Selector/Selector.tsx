import React from "react";
import type { LanguageCode } from "@/../../utilities/language";
import styles from './Selector.module.scss';

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
    <div className={[styles.selector, direction === "row" ? styles.selector__left : styles.selector__right, className].filter(Boolean).join(" ")}
    >
      <label className={styles.selector__label}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value as LanguageCode)}
        className={styles.selector__select}
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
