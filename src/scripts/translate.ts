import language from '../types/language';
import { getTranslation } from '../queries/useTranslation';

const translate = async (
  text: string,
  options: {
    to: language,
    from: language
  },
) => {
  const { to, from } = options;
  try {
    const translation = await getTranslation(text, to, from);
    if (translation) return translation;
  } catch (err) {
    console.error('Error in translation:', err);
  }
  return text;
};

export default translate;
