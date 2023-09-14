import { translate } from '@vitalets/google-translate-api';
import enableCors from './enableCorsAndLimitRate';
import getErrorInTranslationMessage from './getErrorInTranslationMessage';
import language from '../types/language';

const getTranslation = async (
  text: string | string[],
  from?: language,
  to?: language,
) : Promise<string | undefined> => {
  try {
    //  rate limit (1 request per second) and CORS policy overriding (if any)
    enableCors(1);

    //  translating happens here. ✨ bing! ✨
    const translation = await translate(text as string, { from, to });
    return translation.text;
  } catch (error) {
    console.error(getErrorInTranslationMessage(error));
    return undefined;
  }
};

export default getTranslation;
