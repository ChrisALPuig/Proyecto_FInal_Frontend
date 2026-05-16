import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import translations, { Language } from "../i18n/translations";

const normalizeLanguage = (value?: string): Language => {
  if (!value) return "English";
  const normalized = value.trim();
  if (normalized === "Español" || normalized === "Spanish") return "Español";
  return "English";
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => normalizeLanguage(typeof window !== "undefined" ? window.localStorage.getItem("language") || "English" : "English"));

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", language);
    }
  }, [language]);

  const setLanguage = (value: string) => {
    setLanguageState(normalizeLanguage(value));
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const value = useMemo(() => ({ language, setLanguage, t }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
