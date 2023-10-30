import { useQuery } from 'react-query';
import sha256 from 'crypto-js/sha256';

import { useLanguageContext } from '../context/languageContext';

import language from '../types/language';
import translate from '../utils/translate';

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
    () => translate(text, from || languageFrom, to || languageTo).then((val) => JSON.parse(val.json())?.text ?? ''),
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useTranslation;
