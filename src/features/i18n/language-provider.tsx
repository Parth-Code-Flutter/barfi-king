"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { copy, type Copy, type Lang } from "@/features/i18n/copy";

const STORAGE_KEY = "bk-lang";
const CHANGE_EVENT = "bk-lang-change";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof Copy) => string;
  text: (value: { gu: string; en: string }) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

let hasMounted = false;

function readLang(): Lang {
  // Stay on Gujarati until after hydration so the server HTML matches.
  if (!hasMounted) return "gu";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "gu";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribe, readLang, () => "gu");

  const setLang = useCallback((next: Lang) => {
    hasMounted = true;
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  useEffect(() => {
    hasMounted = true;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "gu" ? "gu" : "en";
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => copy[lang][key],
      text: (entry) => entry[lang],
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return value;
}
