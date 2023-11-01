# react-g-translator
A modern, *free*, *lightweight* npm package for translating react apps (pages and components) on the fly. *No API keys or language list files* are required.

## Features
- Covers multiple use cases (see [Usage](#usage))
- Enables Web Internationalisation (i18n) and Accessibility (a11y)
- Allows to create custom language change component
- Auto language detection
- Spelling and Language correction
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com) uses
- Allows to set defualt language and destination language in code.
- Translates entire pages and just text.
- Translates `input` and `textarea` element placeholder as well as `img` (image) alt text.
- Allows for custom language list files. (Coming in v2.0.0)

## Install
```npm install @miracleufo/react-g-translator```

or with yarn

```yarn add @miracleufo/react-g-translator```

## Usage

> DISCLAIMER!
To be 100% legal please use the official [Google Translate API](https://cloud.google.com/translate). This project is mainly for pet projects and prototyping 😉. The server is very limited, for use in **production** see [PRODUCTION USAGE.](#production-usage) Always only use the most **recent version** of this package.

### To translate whole component:
```jsx
import Translator from '@miracleufo/react-g-translator';

const Component = () => {
  ...
  return (
    <Translator from='en' to='es'>
      <div>
        ...
      </div>
    </Translator>
  );
}
```
**NB:** Each non-void React element is translated like a paragraph, for best translation please avoid <br /> and use <p> instead, and always end sentences with fullstop.

### To translate specific text inline:
```jsx
import { Translate } from '@miracleufo/react-g-translator';

return (
  <div>
    ...
    <Translate from='en' to='fr'>Hello in French.</Translate>
    {/* Can also be used within elements */}
    <p>
      <Translate from='en' to='de'>Welcome in German.</Translate>
      Happy to meet you.
    </p>
    ...
  </div>
);
```

### To get translation of text directly:
```jsx
import { getTranslation } from '@miracleufo/react-g-translator';

const helloInIgbo = await getTranslation('Hello', 'en', 'ig');

return (
  <div>
    <p>{helloInIgbo}></p>
  </div>
)
```

## API
### Props
 - `from`: Language the text(s) is provided in. Optional.
    - Defaults to "en".
    - *Type string*. String provided must be found in [supported languages.](https://cloud.google.com/translate/docs/languages)
    - Overriden by [`setLanguageFrom`](#hook-setlanguagefrom) hook. (Coming in V2)

  - `to`: Language to translate to. Optional.
    - Defaults to *user's current browser language setting*.
    - *Type string*. String provided must be found in [supported languages.](https://cloud.google.com/translate/docs/languages)
    - Overriden by [`setLanguageTo`](#hook-setlanguageto) hook. (Coming in V2)

 - `shouldFallback`: Determines error handling. Available in `<Translate />` and `<Translator />`, when error, displays original text when `shouldFallback` is true, or empty string otherwise. Optional.
    - Defaults to `true`.
    - *Type boolean*. If not provided will default to true.
    - **NOTE:** Will always log exception when there is an error in translation.

### Wrapper: `<Translator />` ###
  *Type:* React functional component

  *Note:* **Directly wraps a valid Provider or a jsx parent (not text.)**

  *Props:*
  - [`from`](#props) *optional*
  - [`to`](#props) *optional*
  - [`shouldFallback`](#props) *optional*


### Wrapper: `<Translate />` ###
  *Type:* React functional component
  
  *Note:* **Must directly wrap text.**

  *Props:*
  - [`from`](#props) *optional*
  - [`to`](#props) *optional*
  - [`shouldFallback`](#props) *optional*
  
### Method `getTranslation(text, from, to)` ###
Translates text and returns translation.
Best used if specific text(s) needs to be translated in-line without wrapping in provider.
See [Usage](#to-get-translation-of-text-directly)

*Type:* Function

*Returns*: string | Error

*Params:*
- `text`: *Type string*, *required*
- [`from`](#props)  *optional*
- [`to`](#props)  *optional*

## Caching
- For every UNIQUE `text`, `to`, and `from` [(props)](#props) combination the translation is fetched & cached for 24 hours (as long as QueryClient is not destroyed,) this is to prevent unnecessary requests.
- QueryClient is destroyed in this case ONLY when the web page is reloaded.

## Special Cases

- [`from`](#props) and [`to`](#props) being the same will return original text (determined by google translation API.)
- [`from`](#props) and [`to`](#props) being empty strings will be extrapolated from 'en' and *user's current browser language setting* respectively.
- `text` is not in the [`from`](#props) language and google translate API cannot detect language automatically, it will return the original text. 

## Production Usage:
The server for this package is very limited and may not meet your projects' needs, to aid package use in production:
  - **FORK** the server at this [repo](https://github.com/MiracleUFO/react-g-translator-proxy-express).
  - Host the server, then in the environment file(s) (`.env.*`) of the React project assign the hosted server's url/address to `REACT_APP_TRANSLATE_SERVER_TOKEN`.
  - To enable authentication, you can protect your server by editing code in the server [repo](https://github.com/MiracleUFO/react-g-translator-proxy-express) see [this](https://christiangiacomi.com/posts/express-barer-strategy) for help, once authorisation code is running on server assign the server's authentication token to `REACT_APP_TRANSLATE_SERVER_TOKEN` in the React projects' environment file(s) (`.env.*`)
  - **NB**: You will need a **MONGODB ATLAS CLUSTER** to run the server successfully. [Create one](https://www.mongodb.com/docs/guides/atlas/cluster), and assign the Atlas cluster's credentials to `MONGOOSE_ATLAS_CONNECTION_STRING` & `MONGOOSE_ATLAS_PASSWORD` in your **server's** environment file (keep this private.)
  - Also, if **delay** between requests is too long, edit [this](https://github.com/MiracleUFO/react-g-translator-proxy-express/blob/main/src/index.ts#L42) and/or [this](https://github.com/MiracleUFO/react-g-translator-proxy-express/blob/main/src/utils/delayRequests.ts#L17-L19) in your server.

## Developer Testing
- [Install node-modules](#install)
- `npm run test` or `yarn run test`
- **Note**
  - Some tests in `src/tests` may fail because google translate API might return synonyms when a string is translated multiple times.
  - If `TooManyRequestsError` or Error Code `429` is encountered, this issue is due to Google Translate APIs rate limiting per IP address (this limit seems variable, see [discussion.](https://github.com/vitalets/google-translate-api/issues/107#issuecomment-1302220214)) Switching internet providers may solve this (temporarily.)
  - [**Caching**](#caching) is **OFF** by default in testing, to turn **ON**, replace `QUERY_DEFAULT_OPTIONS` in `tests/constants-test.ts` with:
```js
const ONE_DAY_IN_MS = 24 * (60 * 60 * 1000);
const DEFAULT_QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: ONE_DAY_IN_MS,
      cacheTime: ONE_DAY_IN_MS,
    },
  },
};
```