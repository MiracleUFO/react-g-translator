# react-g-translator
A modern, *free*, *lightweight* npm package for translating react apps (pages and components) on the fly. *No API keys or language list files* are required.

## Features
- Covers multiple use cases (see [Usage](#usage))
 - Allows to create custom language change component
- Auto language detection
- Spelling and Language correction
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com) uses
- Allows to set defualt language and destination language in code.
- Translates entires pages and just text.
- Allows for custom language list files. (Coming in v2.0.0)

## Install
```npm install react-g-translator```

or with yarn

```yarn add react-g-translator```

## Usage

### To translate whole component:
```jsx
import Translator from 'react-auto-translate';

return (
  <Translator
      from='en'
      to='es'
    >
    <Component>
      ...
    </Component>
  </Translator>
);
```

### To translate specific text inline:
```jsx
import { Translate } from 'react-auto-translate';

return (
  <div>
    ...
    <p>Hello.</p>
    <p><Translate from="en" to="fr">Hello in French.</Translate></p>
    ...
  </div>
);
```

### To change to and from props dynamically:
Overrides `to` and `from` of the <Translator> and <Translate> wrappers across the app (*Use with care*).
```jsx
import { useTranslate } from 'react-auto-translate';

const { setLanguageFrom, setLanguageTo } = useTranslate();

setLanguageFrom('es-US');
setLanguageTo('ig');

return (
  <div>
    <p><Translate from="en" to="fr">How are you?</Translate></p>
  </div> // Here, "to" value is overriden under the hood to ig, and "from" value is overriden to "en-US" within the wrappers across the app.
)
```

### To get translation of text directly:
```jsx
import { useTranslate } from 'react-auto-translate';

const { translate } = useTranslate();
const helloInIgbo = translate('Hello', 'en', 'ig');

return (
  <div>
    <p>{helloInIgbo}></p>
  </div>
)
```

## API
### Props
 - `from`: Language the text(s) is provided in.
    - Defaults to "en".
    - *Type string*. If string provided is not found [here](https://cloud.google.com/translate/docs/languages), will default to "en".
    - Overriden by [`setLanguageFrom`](#hook-setlanguagefromfrom) hook.


  - `to`: Language to translate to.
    - Defaults to *user's current browser langauge setting*.
    - *Type string*. If string provided is not found [here](https://cloud.google.com/translate/docs/languages) will default to  *user's current browser langauge setting*.
    - Overriden by [`setLanguageTo`](#hook-setlanguagetoto) hook.


### Wrapper: `<Translator />` ###
  *Type:* React functional component

  *Props:*
  - [`from`](#props)
  - [`to`](#props)

  *Note:* 
  - Directly wraps a valid Provider or a jsx parent (not text.)


### Wrapper: `<Translate />` ###
  *Type:* React functional component

  *Props:*
  - [`from`](#props)
  - [`to`](#props)
  
  *Note:* 
  - Directly wraps text.


### Hook `useTranslate` ###
  *Type*: React hook

  *Returns*: 
  - [`setLanguageFrom`](#hook-setlanguagefromfrom)
  - [`setLanguageTo`](#hook-setlanguagetoto)
  - [`translate`](#hook-translatetext-from-to)


### Hook `setLanguageFrom(from)` ###
Overrides `from` prop in all <Translator> and <Translate> components within the app.

*Type:* React hook

*Params:*
- [`from`](#props) *required*


### Hook `setLanguageTo(to)` ###
Overrides `to` prop in all <Translator> and <Translate> components within the app.

*Type:* React hook

*Params:*
- [`to`](#props) *required*


### Method `translate(text, from, to)` ###
Translates text and returns translation.

*Type:* Function

*Returns*: string

*Params:*
- `text`: *Type string*, *required*
- [`from`](#props)  *required*
- [`to`](#props)  *required*