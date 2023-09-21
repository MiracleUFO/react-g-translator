import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { LanguageProvider } from '../context/languageContext';
import { DEFAULT_QUERY_OPTIONS } from '../constants';

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

//  google-translate-api char limit per request is 5000 chars
//  Used for testing
const CHAR_LIMIT_TEXT_ENGLISH = ('Be kind to everyone, regardless of their race, religion, gender, or sexual orientation. Help those in need, whether it\'s by volunteering our time, donating to charity, or simply lending a helping hand. Protect our planet by reducing our consumption of resources, recycling, and using renewable energy sources. Educate ourselves about the world around us and the challenges that we face.  Get involved in our communities and make our voices heard. Vote for candidates who share our values and who will work to make the world a better place.');
const CHAR_LIMIT_TEXT_FRENCH = ('Soyez gentil avec tout le monde, quels que soient leur race, leur religion, leur sexe ou leur orientation sexuelle. Aidez ceux qui en ont besoin, que ce soit en donnant de notre temps, en faisant un don à une œuvre caritative ou simplement en donnant un coup de main. Protégez notre planète en réduisant notre consommation de ressources, en recyclant et en utilisant des sources d\'énergie renouvelables. Instruisons-nous sur le monde qui nous entoure et les défis auxquels nous sommes confrontés. Impliquez-vous dans nos communautés et faites entendre nos voix. Votez pour des candidats qui partagent nos valeurs et qui travailleront à rendre le monde meilleur.');

export { CHAR_LIMIT_TEXT_ENGLISH, CHAR_LIMIT_TEXT_FRENCH };
export * from '@testing-library/react';
export { customRender as render };
