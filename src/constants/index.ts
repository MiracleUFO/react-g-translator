import language from '../types/language';

const HELLO_IN_ENGLISH = 'Hello World';
const HELLO_IN_SPANISH = 'Hola Mundo';
const HELLO_IN_FRENCH = 'Bonjour Monde';

const DEFAULT_PROPS = {
  from: 'en',
  to: 'auto',
  shouldFallback: true,
};

const DEFAULT_LANGUAGE_FROM: language = 'en';
const DEFAULT_BROWSER_LANGUAGE : language = window?.navigator?.language.startsWith('zh')
  ? window?.navigator?.language as language
  : window?.navigator?.language.split('-')[0] as language;

const TRANSLATION_NOT_FOUND_MESSAGE = 'Err 404: No translation found. Check `to` & `from` props.';

export {
  HELLO_IN_ENGLISH,
  HELLO_IN_FRENCH,
  HELLO_IN_SPANISH,
  DEFAULT_PROPS,
  DEFAULT_LANGUAGE_FROM,
  DEFAULT_BROWSER_LANGUAGE,
  TRANSLATION_NOT_FOUND_MESSAGE,
};
