import { useLanguageContext } from './context/languageContext';
export * from './components/Translate';
export * from './scripts/translate';
const {
  languageFrom, 
  languageTo,
  setLanguageFrom,
  setLanguageTo, 
  resetFrom,
  resetTo,
  resetLanguages
} = useLanguageContext();
export {
  languageFrom, 
  languageTo,
  setLanguageFrom,
  setLanguageTo, 
  resetFrom,
  resetTo,
  resetLanguages
};