import language from '../types/language';
import { getTranslation } from '../queries/useTranslation';

export const translate = async (
  text: string,
  options: {
    to: language,
    from: language
  }
) => {
  const { to, from } = options;
  const translation = await getTranslation(text, to, from);
  if (translation) return translation;
};
