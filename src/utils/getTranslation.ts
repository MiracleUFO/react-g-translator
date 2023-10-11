import throttle from 'lodash/throttle';
import chunkRequest from './chunkRequest';
import translate from './translate';

import { CHARACTER_LIMIT, DEBOUNCE_RATE } from '../constants';
import language from '../types/language';

const getTranslation = async (
  text: string | string[],
  from?: language,
  to?: language,
) : Promise<string | undefined> => {
  const translateRequest = async (chunk: string | string[]) => {
    //  translating happens here. ✨ bing! ✨
    const translation = await translate(chunk as string, from, to);
    return JSON.parse(translation)?.text ?? '';
  };

  return throttle(
    (() => chunkRequest(text, translateRequest, CHARACTER_LIMIT)),
    DEBOUNCE_RATE,
  )();
};

export default getTranslation;
