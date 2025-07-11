<h1 align=center>React String Binder</h1> 
<div align=center>

[![CI](https://github.com/rejchev/react-string-binder/actions/workflows/ci.yml/badge.svg)](https://github.com/rejchev/react-string-binder/actions/workflows/ci.yml)
[![LICENSE](https://img.shields.io/github/license/rejchev/sm-jansson)](LICENSE)

</div>

## About
A simple react string binder lib.

The StringBinder allows you to replace keywords in plain text with ReactNode elements

## Install
`npm i @rejchev/react-string-binder`

## Usage
### Keywords
A keyword in plain text must start & close with `$` and contain only `A-Za-z` with out any spaces (min len = 1).

```jsx

// keyword is $keyword$
const success = `This is a $keyword$.`;

// just not handled
const fail = `This is not a $1keyword`;

// just not handled
const watch = `This is not a $key_word`;

// multiply keys: $flowers, $crons
const multiple = "$flowers$ and $crowns$.";
```
### Binds
Keys of bindable `ReactNode` | `string` must be same as keywords but without `$`

```jsx
import StringBinderInstance from "@rejchev/react-string-binder";

const text = "This is a simple $nl$";

const result = StringBinderInstance.bind(text, {
    nl: <hr />
})

```

## Usage example

```jsx

import StringBinderInstance, {StringBinderT} from "@rejchev/react-string-binder";

function App() {

  const text =
    "The spring sun warms the awakening nature. $n$" +
    "Birds chirp joyfully in the tree $crowns$, $flowers$ stretch towards the heavenly surface. $n$" +
    "The air is filled with freshness and the aroma of the first flowers."

  const unknownKeys =
    // Test variant <br/>
    "Test $variant$ $n$" +

    // Test another_variant <br/>
    "Test another_$variant$ $n$" +

    // Test third_variant_variant
    "Test third_$variant$_variant"

  const oneMore =
    // Test <a href="//yandex.ru" target="_blank">flowers</a>flowers <br/>
    "Test $flowers$flowers $n$" +

    // Test <a href="//yandex.ru" target="_blank">flowers</a>flowers <br/>
    "Test $flowers$flowers$ $n$" +

    // Test <a href="//yandex.ru" target="_blank">flowers</a><a href="//yandex.ru" target="_blank">flowers</a> <br/>
    "Test $flowers$$flowers$ $n$"

  const binder : StringBinderT = {
    crowns: <a href={'//google.com'} target={'_blank'}>crowns</a>,
    flowers: <a href={'//yandex.ru'} target={'_blank'}>flowers</a>,
    n: <br/>,
  }

  return (
    <>
      <p className="read-the-docs">
        {StringBinderInstance.bind(text, binder)}
      </p>
      <p className="read-the-docs">
        {StringBinderInstance.bind(unknownKeys, binder)}
      </p>
      <p className="read-the-docs">
        {StringBinderInstance.bind(oneMore, binder)}
      </p>
    </>
  )
}
```