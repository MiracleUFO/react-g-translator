import { translate } from '@vitalets/google-translate-api';
import { HttpsProxyAgent } from 'https-proxy-agent';

import chunkRequest from './chunkRequest';
import enableCors from './enableCorsAndLimitRate';

import { IS_DEVELOPMENT_OR_TEST, PROXY } from '../constants';
import language from '../types/language';

const getTranslation = async (
  text: string | string[],
  from?: language,
  to?: language,
) : Promise<string | undefined> => {
  //  for development or testing
  //  in case `TooManyRequestsError` or Error Code `429`
  const fetchOptions = IS_DEVELOPMENT_OR_TEST && PROXY && { agent: new HttpsProxyAgent(PROXY) };

  const translateRequest = async (chunk: string | string[]) => {
    //  CORS policy overriding
    enableCors(1);

    //  translating happens here. ✨ bing! ✨
    const translation = await translate(chunk as string, { from, to, fetchOptions });
    return translation.text;
  };

  return chunkRequest(text, translateRequest, 5000);
};

export default getTranslation;
