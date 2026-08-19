import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Dict } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";

export type Lang = "en" | "fr" | "ar";

export const dictionaries: Record<Lang, Dict> = { en, fr, ar };

export const langOptions: { code: Lang; flag: string; short: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", short: "EN", label: "English" },
  { code: "fr", flag: "🇫🇷", short: "FR", label: "Français" },
  { code: "ar", flag: "🇩🇿", short: "AR", label: "العربية" },
];

const STORAGE_KEY = "echo.lang";

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const code = (raw || "").toLowerCase();
    if (code.startsWith("ar")) return "ar";
    if (code.startsWith("fr")) return "fr";
    if (code.startsWith("en")) return "en";
  }
  return "en";
}

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  dir: "ltr" | "rtl";
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    setLangState(stored && stored in dictionaries ? stored : detectLang());
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const t = dictionaries[lang];
  const dir = t.dir;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    document.title = t.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.seo.description);
  }, [t]);

  const value = useMemo(() => ({ lang, setLang, t, dir }), [lang, setLang, t, dir]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

export function useT() {
  return useLang().t;
}