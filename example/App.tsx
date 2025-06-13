import StringBinderInstance from "../lib";


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

  return (
    <>
      <p className="read-the-docs">
        {StringBinderInstance.bind(text, {
          crowns: <a href={'//google.com'} target={'_blank'}>crowns</a>,
          flowers: <a href={'//yandex.ru'} target={'_blank'}>flowers</a>,
          n: <br/>,
        })}
      </p>
      <p className="read-the-docs">
        {StringBinderInstance.bind(unknownKeys, {
          crowns: <a href={'//google.com'} target={'_blank'}>crowns</a>,
          flowers: <a href={'//yandex.ru'} target={'_blank'}>flowers</a>,
          n: <br/>,
        })}
      </p>
      <p className="read-the-docs">
        {StringBinderInstance.bind(oneMore, {
          crowns: <a href={'//google.com'} target={'_blank'}>crowns</a>,
          flowers: <a href={'//yandex.ru'} target={'_blank'}>flowers</a>,
          n: <br/>,
        })}
      </p>
    </>
  )
}

export default App
