import { translate } from '@vitalets/google-translate-api';

import chunkRequest from './chunkRequest';
import enableCors from './enableCorsAndLimitRate';
import language from '../types/language';

const getTranslation = async (
  text: string | string[],
  from?: language,
  to?: language,
) : Promise<string | undefined> => {
  const translateRequest = async (chunk: string | string[]) => {
    //  CORS policy overriding (if any)
    enableCors(1);

    //  translating happens here. ✨ bing! ✨
    const translation = await translate(chunk as string, { from, to });
    return translation.text;
  };

  return chunkRequest(text, translateRequest, 5000);
};

export default getTranslation;
