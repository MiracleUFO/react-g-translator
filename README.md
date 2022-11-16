# react-g-translator
A modern, *free*, *lightweight* npm package for translating react apps (pages and components) on the fly. *No API keys or language list files* are required.

## Features
- Covers multiple use cases (see ##Usages)
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
```jsx: To translate whole component.
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
 - `from`: Language text is provided in. 
      *Type string* [If string provided is not found here, will default to "en"](https://cloud.google.com/translate/docs/languages).
      Defaults to "en".
      Can be overriden by `setLanguageFrom` hook.

  - `to`: Language to translate to.
      *Type string* [If string provided is not found here, will default to  *user's current browser langauge setting*.](https://cloud.google.com/translate/docs/languages).
      Defaults to *user's current browser langauge setting*.
      Can be overriden by `setLanguageTo` hook.


### Wrapper: `<Translator />` ###
  *Type:* React functional component
  *Props:*
  - `from`
  - `to`
  *Note:* 
  - Directly wraps a valid Provider or a jsx parent (not text.)


### Wrapper: `<Translate>` ###
  *Type:* React functional component
  *Props:*
  - `from`
  - `to`
  *Note:* 
  - Directly wraps text.


## Hook `useTranslate` ###
  *Type*: React hook
  *Returns*: 
  - `setLanguageFrom`
  - `setLanguageTo`
  - `translate`


## Hook `setLanguageFrom(from)` ###
Overrides `from` prop in all <Translator> and <Translate> components within the app.
*Type:* React hook
*Params:*
- `from`


## Hook `setLanguageTo(to)` ###
Overrides `to` prop in all <Translator> and <Translate> components within the app.
*Type:* React hook
*Params:*
- `to`


## Hook `translate(text, from, to)` ###
Translates text and returns translation.
*Type:* Function
*Returns*: string
*Params:*
- `text`: *Type string* *required*
- `from`
- `to`