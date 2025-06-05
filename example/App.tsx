import StringBinderInstance from "../lib";


function App() {

  const text =
    "The spring sun warms the awakening nature. " +
    "Birds chirp joyfully in the tree $crowns, $flowers stretch towards the heavenly surface. " +
    "The air is filled with freshness and the aroma of the first flowers."

  return (
    <>
      <p className="read-the-docs">
        {StringBinderInstance.bind(text, {
          crowns: <a href={'//google.com'} target={'_blank'}>crowns</a>,
          flowers: <a href={'//yandex.ru'} target={'_blank'}>flowers</a>
        })}
      </p>
    </>
  )
}

export default App
