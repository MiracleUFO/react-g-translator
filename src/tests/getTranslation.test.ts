import getTranslation from '../scripts/getTranslation';
import {
  JEST_TIMEOUT,
  HELLO_IN_ENGLISH,
  HELLO_IN_FRENCH,
  HELLO_IN_SPANISH,
  CHAR_LIMIT_TEXT_ENGLISH,
  CHAR_LIMIT_TEXT_FRENCH,
} from './constants-test';

jest.setTimeout(JEST_TIMEOUT);

describe('getTranslation correctly when language to and from specified correctly', () => {
  it('should return the correct translated text when `to` and `from` are supported language', async () => {
    const result = await getTranslation(HELLO_IN_FRENCH, 'fr', 'en');
    expect(result).toBe(HELLO_IN_ENGLISH);
  });

  it('should fallback to the default text if the translation is not found', async () => {
    const result = await getTranslation(HELLO_IN_ENGLISH, 'am', 'am');
    expect(result).toBe(HELLO_IN_ENGLISH);
  });

  it('should return original text if `to` and `from` are the same', async () => {
    const result = await getTranslation(HELLO_IN_ENGLISH, 'en', 'en');
    expect(result).toBe(HELLO_IN_ENGLISH);
  });
});

describe('getTranslation if language to and/or from NOT specified', () => {
  it('should use "en" for languageFrom if not specified', async () => {
    const result = await getTranslation(HELLO_IN_ENGLISH, undefined, 'es');
    expect(result).toBe(HELLO_IN_SPANISH);
  });

  //  Test AS IS passes ONLY for browser's with default language "en"
  it('should use user\'s browser language if languageTo not specified', async () => {
    const result = await getTranslation(HELLO_IN_SPANISH, 'es', 'en');

    //  to work for your language please update HELLO_IN_ENGLISH on ln 29 below
    //  to be Hello in your default browser language
    expect(result).toBe(HELLO_IN_ENGLISH);
  });
});

describe('getTranslation without character limit & repetition gives same result', () => {
  it('should correctly translate text > 5000 characters', async () => {
    const result = await getTranslation(CHAR_LIMIT_TEXT_ENGLISH, 'en', 'fr');
    expect(result).toBe(CHAR_LIMIT_TEXT_FRENCH);
  });
});
