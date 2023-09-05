import React, {
  useState,
  useMemo,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import language from '../types/language';

const defaultBrowserLanguage : language = window?.navigator?.language.startsWith('zh')
  ? window?.navigator?.language as language
  : window?.navigator?.language.split('-')[0] as language;
const LanguageContext = createContext({
  languageFrom: 'en' as language | undefined,
  languageTo: defaultBrowserLanguage as language | undefined,
  // eslint-disable-next-line no-unused-vars
  setLanguageFrom: (_from: language) => {},
  // eslint-disable-next-line no-unused-vars
  setLanguageTo: (_to: language) => {},
  resetLanguages: () => {},
  resetFrom: () => {},
  resetTo: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode}) => {
  const [languageFrom, setLanguageFrom] = useState<language>();
  const [languageTo, setLanguageTo] = useState<language>();

  const resetLanguages = () => {
    setLanguageFrom('en');
    setLanguageTo(defaultBrowserLanguage);
  };

  const resetFrom = () => {
    setLanguageFrom('en');
  };

  const resetTo = () => {
    setLanguageTo(defaultBrowserLanguage);
  };

  const value = useMemo(() => (
    {
      languageFrom,
      languageTo,
      setLanguageFrom,
      setLanguageTo,
      resetFrom,
      resetTo,
      resetLanguages,
    }
  ), []);

  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
