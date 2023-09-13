import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LanguageProvider } from '../context/languageContext';
import useTranslation from '../queries/useTranslation';
import determineRenderedText from '../utils/determineRenderedText';

import language from '../types/language';
import { DEFAULT_PROPS } from '../constants';

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
  const queryClient = new QueryClient();
  const { data, isError, isLoading } = useTranslation(children, to, from);

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
