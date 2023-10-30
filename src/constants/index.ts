import { QueryClientConfig } from 'react-query';
import language from '../types/language';

const { NODE_ENV, TEST_TRANSLATE_API_PROXY } = process.env;

// NODE ENVIRONMENT
const NODE_DEVELOPMENT = 'development';
const NODE_TEST = 'test';
const IS_DEVELOPMENT_OR_TEST = NODE_ENV && [NODE_DEVELOPMENT, NODE_TEST].includes(NODE_ENV);

const PROXY_URL = 'https://react-g-translator-proxy-express.onrender.com/translate';
const PROXY_URL_ALT = 'https://react-g-translator-proxy.vercel.app/api';
const PROXY_URL_TEST = TEST_TRANSLATE_API_PROXY;

const DEFAULT_PROPS = {
  from: 'en',
  to: 'auto',
  shouldFallback: true,
};

const ONE_DAY_IN_MS = 24 * (60 * 60 * 1000);

const DEFAULT_QUERY_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: ONE_DAY_IN_MS,
      cacheTime: ONE_DAY_IN_MS,
    },
  },
};

const DEFAULT_LANGUAGE_FROM: language = 'en';
const DEFAULT_BROWSER_LANGUAGE : language = window?.navigator?.language.startsWith('zh')
  ? window?.navigator?.language as language
  : window?.navigator?.language.split('-')[0] as language;

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
  PROXY_URL_TEST,
  DEFAULT_PROPS,
  DEFAULT_QUERY_OPTIONS,
  DEFAULT_LANGUAGE_FROM,
  DEFAULT_BROWSER_LANGUAGE,
  CHARACTER_LIMIT,
  DEBOUNCE_RATE,
  TRANSLATION_NOT_FOUND_MESSAGE,
};
