import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useTranslation from '../queries/useTranslation';

const queryClient = new QueryClient();

export const Translate = ({ children, to, from } : {
  children: string,
  to: string,
  from: string,
}) => {
  const { data } = useTranslation(children, to, from);
 
  return (
    <QueryClientProvider client={queryClient}>
      {data}
    </QueryClientProvider>
  );
};
