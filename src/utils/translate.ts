import getErrorInTranslationMessage from './getErrorInTranslationMessage';
import {
  PROXY_URL,
  PROXY_URL_ALT,
  SERVER_URL,
  SERVER_TOKEN,
} from '../constants';
import language from '../types/language';

const translate = async (text: string, from?: language, to?: language) => {
  const requestOptions = {
    credentials: 'omit',
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SERVER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        text,
        from,
        to,
      },
    ),
  } as RequestInit;

  let response;
  response = await fetch(SERVER_URL || PROXY_URL, requestOptions);

  if (response.status !== 200) response = await fetch(SERVER_URL || PROXY_URL_ALT, requestOptions);

  if (response.status === 200) return response.json();

  const error = new Error(`${response.status} - ${response.statusText}`);
  throw getErrorInTranslationMessage(error);
};

export default translate;
