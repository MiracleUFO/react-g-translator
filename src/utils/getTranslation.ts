import { translate } from '@vitalets/google-translate-api';
import language from '../types/language';

export const getTranslation = async (
  text: string | string[],
  to?: language,
  from?: language,
) : Promise<string> => {
  try {
    const translateOptions = {
      from,
      to,
      forceTo: true,
      forceFrom: true,
      forceBatch: true,
    };
    const translation = await translate(text as string, translateOptions);
    return translation.text;
  } catch (error) {
    console.error('Error in translation:', error);
    return String(error);
  }
};

export default getTranslation;
