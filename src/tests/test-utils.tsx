import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { LanguageProvider } from '../context/languageContext';

const queryClient = new QueryClient();

const Providers = ({ children }: {children: React.ReactNode}) => (
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
