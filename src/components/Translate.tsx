import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import language from '../types/language';
import { DEFAULT_PROPS } from '../constants';

import { LanguageProvider } from '../context/languageContext';
import useTranslation from '../queries/useTranslation';

const queryClient = new QueryClient();

const Translate = ({ children, to, from } : {
  children: string,
  from?: language,
  to?: language,
}) => {
  const { data } = useTranslation(children, to, from);
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {data}
      </LanguageProvider>
    </QueryClientProvider>
  );
};

Translate.defaultProps = DEFAULT_PROPS;

export default Translate;
