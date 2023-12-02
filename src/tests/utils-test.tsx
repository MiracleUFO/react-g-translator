import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { LanguageProvider } from '../context/languageContext';
import { DEFAULT_QUERY_OPTIONS } from './constants-test';

const queryClient = new QueryClient(DEFAULT_QUERY_OPTIONS);
queryClient.clear();

const Providers = ({ children }: {children: ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      { children }
    </LanguageProvider>
  </QueryClientProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
