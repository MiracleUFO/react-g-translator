import { useQuery } from 'react-query';

import { useLanguageContext } from '../context/languageContext';
import getTranslation from '../utils/getTranslation';

import language from '../types/language';

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
