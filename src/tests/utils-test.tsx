import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { LanguageProvider } from '../context/languageContext';

const queryClient = new QueryClient();

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

const HELLO_IN_ENGLISH = 'Hello World';
const HELLO_IN_SPANISH = 'Hola Mundo';
const HELLO_IN_FRENCH = 'Bonjour Monde';

export * from '@testing-library/react';
export { customRender as render };
export {
  HELLO_IN_ENGLISH,
  HELLO_IN_SPANISH,
  HELLO_IN_FRENCH,
};
