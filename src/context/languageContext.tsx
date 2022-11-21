import React, { useState, useContext, createContext, ReactNode } from 'react';

const defaultBrowserLanguage : language 
    = window?.navigator?.language.startsWith('zh') 
    ? window?.navigator?.language as language 
    : window?.navigator?.language.split('-')[0] as language
;

const LanguageContext = createContext({
  languageFrom: 'en' as language | null | undefined,
  languageTo: defaultBrowserLanguage as language | null | undefined,
  setLanguageFrom: (_from: language) => {},
  setLanguageTo: (_to: language) => {},
  resetLanguages: () => {},
  resetFrom: () => {},
  resetTo: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode}) => {
    const [languageFrom, setLanguageFrom] = useState<language | null>();
    const [languageTo, setLanguageTo] = useState<language | null>();

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