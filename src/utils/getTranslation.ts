import { translate } from '@vitalets/google-translate-api';
import enableCors from './enableCorsAndLimitRate';
import language from '../types/language';

const getTranslation = async (
  text: string | string[],
  from?: language,
  to?: language,
) : Promise<string | undefined> => {
  //  rate limit (1 request per second) and CORS policy overriding (if any)
  enableCors(1);

  //  translating happens here. ✨ bing! ✨
  const translation = await translate(text as string, { from, to });
  return translation.text;
};

export default getTranslation;
