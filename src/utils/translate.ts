import { HttpsProxyAgent } from 'https-proxy-agent';
import getErrorInTranslationMessage from './getErrorInTranslationMessage';
import {
  IS_DEVELOPMENT_OR_TEST,
  PROXY_URL,
  PROXY_URL_ALT,
  PROXY_URL_TEST,
} from '../constants';
import language from '../types/language';

const translate = async (text: string, from?: language, to?: language) => {
  // option for development / testing
  // in case of `TooManyRequestsError` (Error Code `429`)
  const fetchOptions = (
    IS_DEVELOPMENT_OR_TEST && PROXY_URL_TEST && { agent: new HttpsProxyAgent(PROXY_URL_TEST) }
  );
  const requestOptions = {
    credentials: 'omit',
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        text,
        from,
        to,
        fetchOptions,
      },
    ),
  } as RequestInit;

  let response;
  response = await fetch(PROXY_URL, requestOptions);

  if (response.status !== 200) response = await fetch(PROXY_URL_ALT, requestOptions);

  if (response.status === 200) return response.json();

  const error = new Error(`${response.status} - ${response.statusText}`);
  throw getErrorInTranslationMessage(error);
};

export default translate;
