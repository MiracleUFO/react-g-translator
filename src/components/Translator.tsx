/* eslint-disable react/jsx-no-useless-fragment */
import React, {
  JSX,
  ReactNode,
  ReactElement,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LanguageProvider } from '../context/languageContext';
import useTranslation from '../queries/useTranslation';
import determineRenderedText from '../utils/determineRenderedText';

import { DEFAULT_PROPS, DEFAULT_QUERY_OPTIONS } from '../constants';
import language from '../types/language';

const queryClient = new QueryClient(DEFAULT_QUERY_OPTIONS);

const Translation = ({
  text,
  from,
  to,
  shouldFallback,
}: {
  text: string;
  from?: language;
  to?: language;
  shouldFallback?: boolean;
}) => {
  const { data, isError, isLoading } = useTranslation(text, from, to);
  const translatedText = determineRenderedText(
    text,
    data,
    shouldFallback,
    isError,
    isLoading,
  );
  return <>{translatedText}</>;
};

Translation.defaultProps = DEFAULT_PROPS;

const recursivelyTranslate = (
  node: ReactNode,
  from?: language,
  to?: language,
  shouldFallback?: boolean,
): ReactNode => {
  if (typeof node === 'string') {
    return (
      <Translation
        text={node}
        from={from}
        to={to}
        shouldFallback={shouldFallback}
      />
    );
  }

  if (isValidElement(node)) {
    return cloneElement(node as ReactElement, {
      children: (
        recursivelyTranslate(Children.toArray(node.props.children), from, to, shouldFallback)
      ),
    });
  }

  if (Children.count(node) === 0) {
    return node;
  }

  return Children.map(node, (child) => recursivelyTranslate(child, from, to, shouldFallback));
};

const Translator = ({
  children,
  from,
  to,
  shouldFallback,
}: {
  children: ReactNode | React.ReactElement<any, any> | Element | JSX.Element;
  from?: language;
  to?: language;
  shouldFallback?: boolean;
}) => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      {recursivelyTranslate(<>{children}</>, from, to, shouldFallback)}
    </LanguageProvider>
  </QueryClientProvider>
);

Translator.defaultProps = DEFAULT_PROPS;

export default Translator;
