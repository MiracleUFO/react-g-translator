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
) : Promise<string> => {
  try {
    const translation = await getTranslationUtil(text, from, to);

    if (translation) return translation;
    throw new Error(TRANSLATION_NOT_FOUND_MESSAGE);
  } catch (error) {
    throw getErrorInTranslationMessage(error);
  }
};

export default getTranslation;
