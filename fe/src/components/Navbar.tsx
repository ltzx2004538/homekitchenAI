"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import '../styles/Pages/Recipe.module.scss';
import { RecipePayload } from "sharedType/recipe";
import { LanguageCode, getLanguage } from "sharedUtilities/language";

const LANG_CODES: LanguageCode[] = [
  "EN", "CN", "FR", "ES", "DE", "IT", "JP", "KR"
];

interface NavbarProps {
  language: RecipePayload["language"];
  onLanguageChange?: (lang: RecipePayload["language"]) => void;
}

export default function Navbar({ language, onLanguageChange }: NavbarProps) {
  const router = useRouter();

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = window.localStorage.getItem("hkai_language");
    if (savedLang && LANG_CODES.includes(savedLang as LanguageCode) && savedLang !== language) {
      onLanguageChange?.(savedLang as LanguageCode);
    }
  }, [language, onLanguageChange]);

  // Save language to localStorage when changed
  useEffect(() => {
    window.localStorage.setItem("hkai_language", language);
  }, [language]);

  return (
    <nav className={'navbar'}>
      <div className={'navbar__left'}>
        <div className={'navTitle'}>HomeKitchen AI</div>
      </div>
      <div className={'navbar__right'}>
        <button type="button" className={'recipe-page_buttons'} onClick={() => router.push('/home')}>
          Home
        </button>
        <button type="button" className={'recipe-page_buttons'} onClick={() => router.push('/recipe')}>
          Recipe
        </button>
        <label htmlFor="navbar-language" className={'navLabel'}>Language:</label>
        <select
          id="navbar-language"
          value={language}
          onChange={e => onLanguageChange?.(e.target.value as LanguageCode)}
          className={'navSelect'}
        >
          {LANG_CODES.map(code => (
            <option key={code} value={code}>{getLanguage(code)}</option>
          ))}
        </select>
      </div>
    </nav>
  );
}
