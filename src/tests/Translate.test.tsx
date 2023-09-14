import { render, waitFor } from './utils-test';
import { Translate } from '../index';
import { HELLO_IN_ENGLISH, HELLO_IN_FRENCH, HELLO_IN_SPANISH } from '../constants';
import language from '../types/language';

// eslint-disable-next-line max-len
const renderTranslate = async (from?: language, to?: language, shouldFallback?: boolean, text?:string) => render(
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

    await waitFor(() => getByText(HELLO_IN_SPANISH));
    expect(getByText(HELLO_IN_SPANISH)).toBeInTheDocument();
  });

  it('should fallback to the default text if the translation is not found', async () => {
    const { getByText } = await renderTranslate('am', 'am');

    await waitFor(() => getByText(HELLO_IN_ENGLISH));
    expect(getByText(HELLO_IN_ENGLISH)).toBeInTheDocument();
  });
});

describe('Translate if language to and/or from NOT specified', () => {
  it('should use "en" for languageFrom if not specified', async () => {
    const { getByText } = await renderTranslate(undefined, 'es');

    await waitFor(() => getByText(HELLO_IN_SPANISH));
    expect(getByText(HELLO_IN_SPANISH)).toBeInTheDocument();
  });

  //  Test AS IS passes ONLY for browser's with default language "en"
  it('should use user\'s browser language if languageTo not specified', async () => {
    const { getByText } = await renderTranslate('fr', undefined, undefined, HELLO_IN_FRENCH);

    //  to work for your language please update HELLO_IN_ENGLISH on ln 52 & 53 below
    //  to be Hello in your default browser language
    await waitFor(() => getByText(HELLO_IN_ENGLISH));
    expect(getByText(HELLO_IN_ENGLISH)).toBeInTheDocument();
  });
});
