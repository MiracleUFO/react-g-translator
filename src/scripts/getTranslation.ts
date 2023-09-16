import getTranslationUtil from '../utils/getTranslation';
import getErrorInTranslationMessage from '../utils/getErrorInTranslationMessage';
import {
  DEFAULT_LANGUAGE_FROM,
  DEFAULT_BROWSER_LANGUAGE,
  TRANSLATION_NOT_FOUND_MESSAGE,
} from '../constants';

//  `getTranslation` is isolated from context and queries
//  allowing for usage outside of wrappers:`<Translate />` and `<Translator />`
const getTranslation = async (
  text: string,
  from = DEFAULT_LANGUAGE_FROM,
  to = DEFAULT_BROWSER_LANGUAGE,
  shouldFallback = true,
) : Promise<string> => {
  //  loading state
  let translation: string | undefined = text;

  try {
    translation = await getTranslationUtil(text, from, to);

    if (
      !translation
      && (typeof shouldFallback !== 'undefined' && !shouldFallback)
    ) throw new Error(TRANSLATION_NOT_FOUND_MESSAGE);

    return (
      translation
      || (shouldFallback && text)
      || ''
    );
  } catch (error) {
    throw getErrorInTranslationMessage(error);
  }
};

export default getTranslation;
