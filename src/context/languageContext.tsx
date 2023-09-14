import {
  useState,
  useMemo,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import { DEFAULT_BROWSER_LANGUAGE, DEFAULT_LANGUAGE_FROM } from '../constants';
import language from '../types/language';

const LanguageContext = createContext({
  languageFrom: DEFAULT_LANGUAGE_FROM,
  languageTo: DEFAULT_BROWSER_LANGUAGE,
  // eslint-disable-next-line no-unused-vars
  setLanguageFrom: (_from: language) => {},
  // eslint-disable-next-line no-unused-vars
  setLanguageTo: (_to: language) => {},
  resetLanguages: () => {},
  resetFrom: () => {},
  resetTo: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode}) => {
  const [languageFrom, setLanguageFrom] = useState<language>(DEFAULT_LANGUAGE_FROM);
  const [languageTo, setLanguageTo] = useState<language>(DEFAULT_BROWSER_LANGUAGE);

  const resetLanguages = () => {
    setLanguageFrom(DEFAULT_LANGUAGE_FROM);
    setLanguageTo(DEFAULT_BROWSER_LANGUAGE);
  };

  const resetFrom = () => {
    setLanguageFrom(DEFAULT_LANGUAGE_FROM);
  };

  const resetTo = () => {
    setLanguageTo(DEFAULT_BROWSER_LANGUAGE);
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
