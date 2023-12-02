import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Translation from './helpers/Translation';
import { LanguageProvider } from '../context/languageContext';
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
}) => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <Translation text={children} from={from} to={to} shouldFallback={shouldFallback} />
    </LanguageProvider>
  </QueryClientProvider>
);

Translate.defaultProps = DEFAULT_PROPS;

export default Translate;
