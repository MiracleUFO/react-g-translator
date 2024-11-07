import { QueryClientConfig } from '@tanstack/react-query';

import language from '../types/language';

/* eslint-disable prefer-destructuring */
//  prefer not destructuring due to Nextjs webpack issues
//  see: https://github.com/vercel/next.js/issues/19420
const REACT_APP_TRANSLATE_SERVER_URL = process.env.REACT_APP_TRANSLATE_SERVER_URL;
const REACT_APP_TRANSLATE_SERVER_TOKEN = process.env.REACT_APP_TRANSLATE_SERVER_TOKEN;
const VITE_APP_TRANSLATE_SERVER_URL = process.env.VITE_APP_TRANSLATE_SERVER_URL;
const VITE_APP_TRANSLATE_SERVER_TOKEN = process.env.VITE_APP_TRANSLATE_SERVER_TOKEN;
const NEXT_PUBLIC_APP_TRANSLATE_SERVER_URL = process.env.NEXT_PUBLIC_APP_TRANSLATE_SERVER_URL;
const NEXT_PUBLIC_APP_TRANSLATE_SERVER_TOKEN = process.env.NEXT_PUBLIC_APP_TRANSLATE_SERVER_TOKEN;

// NODE ENVIRONMENT
const NODE_TEST = 'test';
const NODE_DEVELOPMENT = 'development';
const NODE_ENV = process.env.NODE_ENV;
const IS_DEVELOPMENT_OR_TEST = NODE_ENV && [NODE_DEVELOPMENT, NODE_TEST].includes(NODE_ENV);

const PROXY_URL = 'https://react-g-translator-proxy.vercel.app/api';
const PROXY_URL_ALT = 'https://react-g-translator-proxy-2.vercel.app/api';
const PROXY_URL_RENDER = 'https://react-g-translator-proxy-express.onrender.com/translate';
const SERVER_URL = REACT_APP_TRANSLATE_SERVER_URL || VITE_APP_TRANSLATE_SERVER_URL || NEXT_PUBLIC_APP_TRANSLATE_SERVER_URL || '';
const SERVER_TOKEN = REACT_APP_TRANSLATE_SERVER_TOKEN || VITE_APP_TRANSLATE_SERVER_TOKEN || NEXT_PUBLIC_APP_TRANSLATE_SERVER_TOKEN || '';

const ONE_DAY_IN_MS = 24 * (60 * 60 * 1000);

const DEFAULT_QUERY_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: ONE_DAY_IN_MS,
    },
  },
};

const DEFAULT_LANGUAGE_FROM: language = 'en';
// eslint-disable-next-line no-nested-ternary
const DEFAULT_BROWSER_LANGUAGE : language = (typeof window !== 'undefined') ? (
  window?.navigator?.language?.startsWith('zh')
    ? window?.navigator?.language as language
    : window?.navigator?.language?.split('-')[0] as language
) : 'en';

const DEFAULT_PROPS = {
  from: 'en',
  to: DEFAULT_BROWSER_LANGUAGE || 'auto',
  shouldFallback: true,
};

//  API REQUESTS
const CHARACTER_LIMIT = 5000;
const DEBOUNCE_RATE = 2000;

const TRANSLATION_NOT_FOUND_MESSAGE = 'react-g-translator: Err 404: No translation found. Check `to` & `from` props.';

export {
  NODE_DEVELOPMENT,
  NODE_TEST,
  IS_DEVELOPMENT_OR_TEST,
  PROXY_URL,
  PROXY_URL_ALT,
  PROXY_URL_RENDER,
  SERVER_URL,
  SERVER_TOKEN,
  DEFAULT_PROPS,
  DEFAULT_QUERY_OPTIONS,
  DEFAULT_LANGUAGE_FROM,
  DEFAULT_BROWSER_LANGUAGE,
  CHARACTER_LIMIT,
  DEBOUNCE_RATE,
  TRANSLATION_NOT_FOUND_MESSAGE,
};
