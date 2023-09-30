import {
  ReactNode,
  Children,
  useState,
  useCallback,
} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LanguageProvider } from '../context/languageContext';
import useTranslation from '../queries/useTranslation';
import determineRenderedText from '../utils/determineRenderedText';

import language from '../types/language';
import { DEFAULT_PROPS, DEFAULT_QUERY_OPTIONS } from '../constants';

const queryClient = new QueryClient(DEFAULT_QUERY_OPTIONS);

const Translator: { defaultProps: { from: string; to: string; shouldFallback: boolean; }} = ({
  children,
  from,
  to,
  shouldFallback,
} : {
  children: string,
  from?: language,
  to?: language,
  shouldFallback?: boolean,
}) => {
  const [textToTranslate, setTextToTranslate] = useState('');

  const {
    data,
    isError,
    isLoading,
  } = useTranslation(textToTranslate, from, to);

  const recursivelyTranslate = useCallback((node: ReactNode): ReactNode => {
    if (typeof node === 'string') {
      setTextToTranslate(node);
      const renderedText = determineRenderedText(node, data, shouldFallback, isError, isLoading);
      return renderedText;
    }

    if (Children.count(node) === 0) {
      return node;
    }

    return Children.map(node, (child) => recursivelyTranslate(child));
  }, [data, isError, isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {recursivelyTranslate(children)}
      </LanguageProvider>
    </QueryClientProvider>
  );
};

Translator.defaultProps = DEFAULT_PROPS;

export default Translator;
