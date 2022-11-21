import { useState } from 'react';
import { useQuery } from 'react-query';
import { translate } from '@vitalets/google-translate-api';

const getTranslation = async (
  text: string, 
  to?: language, 
  from?: language,
) : Promise<string> => {
  try {
    const translation = await translate(text, { from, to });
    return translation.text;
  } catch (error) {
    console.log(error);
    return String(error);
  }
};

const useTranslation = (
  text: string,
  to?: language,
  from?: language
) => {
  const [languageFrom, setLanguageFrom] = useState<language>('en');
  const languageFromToSend = from ? from : languageFrom;

  const defaultBrowserLanguage : language 
  = window?.navigator?.language.startsWith('zh') ? window?.navigator?.language as language : window?.navigator?.language.split('-')[0] as language;
  const [languageTo, setLanguageTo] = useState<language>(defaultBrowserLanguage);
  const languageToToSend = to ? to : languageTo;

  const {
    data,
    error,
    isError,
    isLoading
  } 
  = useQuery<string>('translation', () =>  getTranslation(text, languageToToSend, languageFromToSend));
  return {
    data,
    error,
    isError,
    isLoading,
    setLanguageFrom,
    setLanguageTo,
  }
};

export default useTranslation;
