import React, { ReactElement, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { QueryClient, QueryClientProvider } from 'react-query';

import language from '../types/language';
import { LanguageProvider } from '../context/languageContext';
import useTranslation from '../queries/useTranslation';

const queryClient = new QueryClient();

export const Translator = ({ children, to, from } : {
  children: ReactElement,
  to?: language,
  from?: language,
}) => {
  let htmlString = ReactDOMServer.renderToStaticMarkup(children);
  const parser = new global.window.DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  if (doc.childNodes.length > 1) {
    throw new Error('Translator wrapper must have one JSX child.');
  }

  const traverseNodes = (child: ChildNode | null) => {
    let node = child;
    console.log(node);
    if (node) 
    if (node.childNodes.length > 0) {
      for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i] ) {
          const { data } = 
            useTranslation(node.childNodes[i].textContent || '', to, from)
          ;
          if (data) {
            if (node.childNodes[i].nodeName === '#text') {
              node.childNodes[i].textContent = data;
            } else if (node.childNodes[i].childNodes.length) {
              traverseNodes(node.childNodes[i] as Element)
            }
          }
        }
      }
    }
    console.log(node);
    return <>node</>;
  }

  useEffect(() => {

  })

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <>Bonjour</>
      </LanguageProvider>
    </QueryClientProvider>
  );
};
