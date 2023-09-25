import language from '../types/language';

const { NODE_ENV, TRANSLATE_API_PROXY } = process.env;

// NODE ENVIRONMENT
const NODE_DEVELOPMENT = 'development';
const NODE_TEST = 'test';
const IS_DEVELOPMENT_OR_TEST = NODE_ENV && [NODE_DEVELOPMENT, NODE_TEST].includes(NODE_ENV);

const PROXY = TRANSLATE_API_PROXY;

const DEFAULT_PROPS = {
  from: 'en',
  to: 'auto',
  shouldFallback: true,
};

const DEFAULT_QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

const DEFAULT_LANGUAGE_FROM: language = 'en';
const DEFAULT_BROWSER_LANGUAGE : language = window?.navigator?.language.startsWith('zh')
  ? window?.navigator?.language as language
  : window?.navigator?.language.split('-')[0] as language;

const TRANSLATION_NOT_FOUND_MESSAGE = 'react-g-translator: Err 404: No translation found. Check `to` & `from` props.';

export {
  NODE_DEVELOPMENT,
  NODE_TEST,
  IS_DEVELOPMENT_OR_TEST,
  PROXY,
  DEFAULT_PROPS,
  DEFAULT_QUERY_OPTIONS,
  DEFAULT_LANGUAGE_FROM,
  DEFAULT_BROWSER_LANGUAGE,
  TRANSLATION_NOT_FOUND_MESSAGE,
};
