import { useQuery } from 'react-query';
import sha256 from 'crypto-js/sha256';

import { useLanguageContext } from '../context/languageContext';

import language from '../types/language';
import getTranslation from '../utils/getTranslation';

const useTranslation = (
  text: string,
  from?: language,
  to?: language,
) => {
  const { languageFrom, languageTo } = useLanguageContext();
  const {
    data,
    error,
    isError,
    isLoading,
  } = useQuery<string | undefined>(
    sha256(`${text}-${from}-${to}`).toString(),
    () => getTranslation(text, from || languageFrom, to || languageTo),
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useTranslation;
