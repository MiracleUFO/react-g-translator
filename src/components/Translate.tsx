import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LanguageProvider } from '../context/languageContext';
import useTranslation from '../queries/useTranslation';

import determineRenderedText from '../utils/determineRenderedText';
import { DEFAULT_PROPS, DEFAULT_QUERY_OPTIONS } from '../constants';
import language from '../types/language';

const queryClient = new QueryClient(DEFAULT_QUERY_OPTIONS);

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
    isError,
    isLoading,
  } = useTranslation(children, from, to);

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
