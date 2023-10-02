import { translate } from '@vitalets/google-translate-api';
import { HttpsProxyAgent } from 'https-proxy-agent';
import throttle from 'lodash/throttle';

import chunkRequest from './chunkRequest';
import {
  PROXY,
  CHARACTER_LIMIT,
  DEBOUNCE_RATE,
  IS_DEVELOPMENT_OR_TEST,
} from '../constants';
import language from '../types/language';

const getTranslation = async (
  text: string | string[],
  from?: language,
  to?: language,
) : Promise<string | undefined> => {
  //  opts for development / testing
  //  in case `TooManyRequestsError` or Error Code `429`
  const fetchOptions = IS_DEVELOPMENT_OR_TEST && PROXY && { agent: new HttpsProxyAgent(PROXY) };

  //  translating happens here. ✨ bing! ✨
  const translateRequest = async (chunk: string | string[]) => {
    const translation = await translate(chunk as string, { from, to, fetchOptions });
    return translation.text;
  };

  return throttle(
    (() => chunkRequest(text, translateRequest, CHARACTER_LIMIT)),
    DEBOUNCE_RATE,
  )();
};

export default getTranslation;
