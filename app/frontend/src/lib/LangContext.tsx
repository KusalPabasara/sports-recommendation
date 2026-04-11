import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Lang, type Translations, translations } from './i18n';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('sport_rec_lang') as Lang | null;
    return stored && stored in translations ? stored : 'en';
  });

  const setLang = (l: Lang) => {
    localStorage.setItem('sport_rec_lang', l);
    setLangState(l);
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
