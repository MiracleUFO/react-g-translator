import React, { useState, useContext, createContext, ReactNode } from 'react';
import language from '../types/language';

const defaultBrowserLanguage : language 
    = global.window?.navigator?.language.startsWith('zh') 
    ? global.window?.navigator?.language as language 
    : global.window?.navigator?.language.split('-')[0] as language
;

const LanguageContext = createContext({
  languageFrom: 'en' as language | undefined,
  languageTo: defaultBrowserLanguage as language | undefined,
  setLanguageFrom: (_from: language) => {},
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
    }

    const resetTo = () => {
        setLanguageTo(defaultBrowserLanguage);
    }

    return (
        <LanguageContext.Provider 
            value={
                {
                    languageFrom, 
                    languageTo,
                    setLanguageFrom,
                    setLanguageTo, 
                    resetFrom,
                    resetTo,
                    resetLanguages
                }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => useContext(LanguageContext);