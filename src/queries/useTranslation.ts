import { useQuery } from 'react-query';
import { useLanguageContext } from '../context/languageContext';

import getTranslation from '../utils/getTranslation';
import getErrorInTranslationMessage from '../utils/getErrorInTranslationMessage';
import language from '../types/language';

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
    'translation',
    () => getTranslation(text, from || languageFrom, to || languageTo),
    {
      //  more descriptive error than react-query error
      onError: (err: unknown) => {
        console.error(getErrorInTranslationMessage(err));
      },
    },
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useTranslation;
