import { useQuery } from 'react-query';
import translate from 'google-translate-api';

const getTranslation = async (text: string, to: string, from: string) : Promise<string> => {
  try {
    const translation = await translate(text, { from, to });
    return translation.text;
  } catch (error) {
    console.log(error);
    return String(error);
  }
};

const useTranslation = (text: string, to: string, from: string) => {
  const {
      data,
      error,
      isError,
      isLoading
  } = useQuery<string>('translation', () =>  getTranslation(text, to, from));

  return {
      data,
      error,
      isError,
      isLoading
  }
};

export default useTranslation;
