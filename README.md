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
import Translator from 'react-g-translate';

return (
  <Translator from='en' to='es'>
    <App />
  </Translator>
);
```

### To translate specific text inline:
```jsx
import { Translate } from 'react-g-translate';

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
import { getTranslation } from 'react-g-translate';

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
    - *Type string*. If string provided is not found in [supported languages](https://cloud.google.com/translate/docs/languages) will default to  *user's current browser langauge setting*.
    - Overriden by [`setLanguageTo`](#hook-setlanguageto) hook. (Coming in V2)

 - `shouldFallback`: Should translation return original text if error in translation (fallback) or return empty string. Optional.
    - Defaults to `true`.
    - *Type boolean*. If not provided will default to true.
    - **NOTE:** Returns exception when there is an error in translation if set to `false`.

### Wrapper: `<Translator />` ###
  *Type:* React functional component

  *Props:*
  - [`from`](#props) *optional*
  - [`to`](#props) *optional*
  - [`shouldFallback`](#props) *optional*

  *Note:* 
  - Directly wraps a valid Provider or a jsx parent (not text.)


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

*Returns*: string

*Params:*
- `text`: *Type string*, *required*
- [`from`](#props)  *optional*
- [`to`](#props)  *optional*
- [`shouldFallback`](#props) *optional*