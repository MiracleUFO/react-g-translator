import { Translate } from '../index';
import { render, waitFor, cleanup } from './utils-test';
import {
  JEST_TIMEOUT,
  HELLO_IN_ENGLISH,
  HELLO_IN_FRENCH,
  HELLO_IN_SPANISH,
  NORMALIZER_OPTS,
  CHAR_LIMIT_TEXT_ENGLISH,
  CHAR_LIMIT_TEXT_FRENCH_ALT_TWO,
} from './constants-test';
import language from '../types/language';

jest.setTimeout(JEST_TIMEOUT);
afterEach(() => {
  cleanup();
});

// eslint-disable-next-line max-len
const renderTranslate = async (from?: language, to?: language, shouldFallback?: boolean, text?: string) => render(
  <Translate
    to={to}
    from={from}
    shouldFallback={shouldFallback}
  >
    {text || HELLO_IN_ENGLISH}
  </Translate>,
);

describe('Translate when language to and from specified', () => {
  it('should render the correct translated text when `to` and `from` are supported languages', async () => {
    const { getByText } = await renderTranslate('en', 'es');

    await waitFor(() => getByText(HELLO_IN_SPANISH), { timeout: 20000 });
    expect(getByText(HELLO_IN_SPANISH)).toBeInTheDocument();
  });

  it('should fallback to the default text if the translation is not found', async () => {
    const { getByText } = await renderTranslate('am', 'am');

    await waitFor(() => getByText(HELLO_IN_ENGLISH), { timeout: 20000 });
    expect(getByText(HELLO_IN_ENGLISH)).toBeInTheDocument();
  });

  it('should return original text if `to` and `from` are the same', async () => {
    const { getByText } = await renderTranslate('en', 'en');

    await waitFor(() => getByText(HELLO_IN_ENGLISH), { timeout: 20000 });
    expect(getByText(HELLO_IN_ENGLISH)).toBeInTheDocument();
  });
});

describe('Translate if language to and/or from NOT specified', () => {
  it('should use "en" for languageFrom if not specified', async () => {
    const { getByText } = await renderTranslate(undefined, 'es');

    await waitFor(() => getByText(HELLO_IN_SPANISH), { timeout: 20000 });
    expect(getByText(HELLO_IN_SPANISH)).toBeInTheDocument();
  });

  //  Test AS IS passes ONLY for browser's with default language "en" THIS KEEPS FAILING
  it('should use user\'s browser language if languageTo not specified', async () => {
    const { getByText } = await renderTranslate('fr', undefined, undefined, HELLO_IN_FRENCH);

    //  to work for your language please update HELLO_IN_ENGLISH on ln 52 & 53 below
    //  to be Hello in your default browser language
    await waitFor(() => getByText(HELLO_IN_ENGLISH), { timeout: 20000 });
    expect(getByText(HELLO_IN_ENGLISH)).toBeInTheDocument();
  });
});

describe('Translate with no character limit works & repetition gives same result', () => {
  it('should correctly translate text > 5000 characters', async () => {
    const { getByText } = await renderTranslate('en', 'fr', true, CHAR_LIMIT_TEXT_ENGLISH);

    // eslint-disable-next-line max-len
    await waitFor(() => getByText(CHAR_LIMIT_TEXT_FRENCH_ALT_TWO, NORMALIZER_OPTS), { timeout: 20000 });
    expect(getByText(CHAR_LIMIT_TEXT_FRENCH_ALT_TWO, NORMALIZER_OPTS)).toBeInTheDocument();
  });
});
