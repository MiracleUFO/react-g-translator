import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LanguageProvider } from '../context/languageContext';
import useTranslation from '../queries/useTranslation';

const queryClient = new QueryClient();

export const Translate = ({ children, to, from } : {
  children: string,
  to?: language,
  from?: language,
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
