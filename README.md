# react-g-translator
A modern, *free*, *lightweight* npm package for translating react apps (pages and components) on the fly. *No API keys or language list files* are required.

## Features
- Covers multiple use cases (see [Usage](#usage))
 - Allows to create custom language change component
- Auto language detection
- Spelling and Language correction
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com) uses
- Allows to set defualt language and destination language in code.
- Translates entire pages and just text.
- Allows for custom language list files. (Coming in v2.0.0)

## Install
```npm install react-g-translator```

or with yarn

```yarn add react-g-translator```

## Usage

### To translate whole component:
```jsx
import Translator from 'react-g-translator';

return (
  <Translator from='en' to='es'>
    <App />
  </Translator>
);
```

### To translate specific text inline:
```jsx
import { Translate } from 'react-g-translator';

return (
  <div>
    ...
    <p>Hello.</p>
    <p><Translate from='en' to='fr'>Hello in French.</Translate></p>
    ...
  </div>
);
```

### To get translation of text directly:
```jsx
import { getTranslation } from 'react-g-translator';

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
    - *Type string*. If string provided is not found in [supported languages](https://cloud.google.com/translate/docs/languages), will default to "en".
    - Overriden by [`setLanguageFrom`](#hook-setlanguagefrom) hook. (Coming in V2)

  - `to`: Language to translate to. Optional.
    - Defaults to *user's current browser language setting*.
    - *Type string*. If string provided is not found in [supported languages](https://cloud.google.com/translate/docs/languages) will default to  *user's current browser language setting*.
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

## Developer Testing
- [Install node-modules](#install)
- `npm run test` or `yarn run test`
- **Note**
  - Some tests in `src/tests` may fail because google translate API might return synonyms when a string is translated multiple times.
  - If `TooManyRequestsError` or Error Code `429` is encountered, use PROXY by updating `env` variable `TRANSLATE_API_PROXY` with a correct [proxy](https://free-proxy-list.net/) (with yes in Google column.) This error is due to Google Translate APIs rate limiting per IP address (this limit seems variable, see [discussion.](https://github.com/vitalets/google-translate-api/issues/107#issuecomment-1302220214)) Switching internet providers may also solve this (temporarily.)
  - [**Caching**](#caching) is **OFF** by default in testing, to turn **ON**, replace `QUERY_DEFAULT_OPTIONS` in `tests/constants-test.ts` with:
```js
const ONE_DAY_IN_MS = 24 * (60 * 60 * 1000);
const DEFAULT_QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      staleTime: ONE_DAY_IN_MS,
      cacheTime: ONE_DAY_IN_MS,
    },
  },
};
```