# React String Binder
A simple react string binder.

The StringBinder allows you to replace keywords in plain text with ReactNode elements

## Usage
### Keywords
A keyword in plain text must start with `$` and contain only `A-Za-z` with out any spaces.

```jsx

// keyword is $keyword
const success = `This is a $keyword.`;

// just not handled
const fail = `This is not a $1keyword`;

// keyword is $key
const watch = `This is not a $key_word`;

// multiply keys: $flowers, $crons
const multiple = "$flowers and $crowns.";
```
### Binds
Bind object keys must be same as keywords but with out `$`

```jsx
import {StringBinder} from "@rejchev/react-string-binder";

const sbinder = StringBinder.Instance();

const text = "This is a simple $example";

sbinder.bind(text, {
    example: <hr />
})

```

## Usage example

```jsx

import {StringBinder} from "@rejchev/react-string-binder";

const sbinder = StringBinder.Instance();

const text = 
  "The spring sun warms the awakening nature. " +
  "Birds chirp joyfully in the tree $crowns, $flowers stretch towards the heavenly surface. " +
  "The air is filled with freshness and the aroma of the first flowers."

const element = sbinder.bind(text, {
  crowns: <a href={'//en.wikipedia.org/wiki/Crown'} target={'_blank'}>crowns</a>,
  flowers: <a href={'//en.wikipedia.org/wiki/Flower'} target={'_blank'}>flowers</a>
})
```