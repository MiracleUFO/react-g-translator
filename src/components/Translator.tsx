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

import isVoidElement from '../utils/isVoidElement';
import { LanguageProvider } from '../context/languageContext';

import Translation from './helpers/Translation';
import TranslationInputImg from './helpers/TranslationInputImage';

import { DEFAULT_PROPS, DEFAULT_QUERY_OPTIONS } from '../constants';
import language from '../types/language';

const queryClient = new QueryClient(DEFAULT_QUERY_OPTIONS);

const recursivelyTranslate = (
  node: ReactNode,
  from?: language,
  to?: language,
  shouldFallback?: boolean,
): ReactNode => {
  if (typeof node === 'string' && !node) return node;

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

  if (Children.count(node) === 0 || isVoidElement(node)) {
    return (
      <>
        &nbsp;
        {node}
        &nbsp;
      </>
    );
  }

  if (isValidElement(node)) {
    if (node.type === 'textarea' || node.type === 'input' || node.type === 'img') {
      return (
        <TranslationInputImg
          node={node}
          from={from}
          to={to}
          shouldFallback={shouldFallback}
        />
      );
    }

    return cloneElement(node as ReactElement, {
      children: (
        recursivelyTranslate(Children.toArray(node.props.children), from, to, shouldFallback)
      ),
    });
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
