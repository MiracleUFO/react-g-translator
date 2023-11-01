import throttle from 'lodash/throttle';
import chunkRequest from './chunkRequest';
import translate from './translate';

import { CHARACTER_LIMIT, DEBOUNCE_RATE } from '../constants';
import language from '../types/language';
import getErrorInTranslationMessage from './getErrorInTranslationMessage';

const getTranslation = async (
  text: string | string[],
  from?: language,
  to?: language,
) => throttle(async () => {
  const chunks = chunkRequest(text as string, CHARACTER_LIMIT);
  const translations = await Promise.all(chunks.map(async (chunk) => {
    try {
      //  translating happens here. ✨ bing! ✨
      const translation = await translate(chunk, from, to);
      return JSON.parse(translation)?.text ?? '';
    } catch (err) {
      throw getErrorInTranslationMessage(err);
    }
  }));
  const translatedText = translations.join(' ');
  return translatedText;
}, DEBOUNCE_RATE)();

export default getTranslation;
