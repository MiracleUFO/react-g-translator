import { useQuery } from 'react-query';
import { translate } from '@vitalets/google-translate-api';
import language from '../types/language';
import { useLanguageContext } from '../context/languageContext';

export const getTranslation = async (
  text: string,
  to?: language,
  from?: language,
) : Promise<string> => {
  try {
    const translation = await translate(text, { from, to });
    return translation.text;
  } catch (error) {
    console.error(error);
    return String(error);
  }
};

const useTranslation = (
  text: string,
  to?: language,
  from?: language,
) => {
  const { languageFrom, languageTo } = useLanguageContext();
  const {
    data,
    error,
    isError,
    isLoading,
  } = useQuery<string>('translation', () => getTranslation(text, to || languageTo, from || languageFrom));
  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useTranslation;
