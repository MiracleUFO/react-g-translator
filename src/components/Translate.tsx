import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LanguageProvider } from '../context/languageContext';
import useTranslation from '../queries/useTranslation';

import getErrorInTranslationMessage from '../utils/getErrorInTranslationMessage';
import determineRenderedText from '../utils/determineRenderedText';

import { DEFAULT_PROPS } from '../constants';
import language from '../types/language';

const queryClient = new QueryClient();

const Translate = ({
  children,
  to,
  from,
  shouldFallback,
} : {
  children: string,
  from?: language,
  to?: language,
  shouldFallback?: boolean,
}) => {
  const {
    data,
    error,
    isError,
    isLoading,
  } = useTranslation(children, from, to);

  useEffect(() => {
    //  if shouldFallback prop is set to `false` and there's an error:
    //  throw error
    if (
      isError
      && (typeof shouldFallback !== 'undefined' && !shouldFallback)
    ) throw getErrorInTranslationMessage(error);
  }, [isError, error, shouldFallback]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {determineRenderedText(children, data, shouldFallback, isError, isLoading)}
      </LanguageProvider>
    </QueryClientProvider>
  );
};

Translate.defaultProps = DEFAULT_PROPS;

export default Translate;
