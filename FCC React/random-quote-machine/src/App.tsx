// initial double render is fine
// it's cause of Strict Mode
// see main.tsx

import { useState, useEffect } from "react";
import { CSSProperties } from "react";
import "./app.css"
function App() {
  interface quoteInt {
    quote : string,
    author : string
  }
  const [quote, setQuote] = useState<quoteInt>({ quote: '', author: '' });
  const [bgColor, setBgColor] = useState<string>("");

  function random(number : number) {
    return Math.floor(Math.random()*number);
  }
  
  function rndCol() {
    return 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  }
  async function randomQuote() : Promise<{quote : string, author : string, id: number}> {
    const response = await fetch('https://dummyjson.com/quotes/random');
    const quote = await response.json(); //{author: ...,id: ..., quote: ...}
    return quote;
  }
  async function handleClick() : Promise<void> {
    const {quote, author} = await randomQuote(); //{author: ...,id: ..., quote: ...}
    setQuote({quote, author});
    setBgColor(rndCol());
  }
  useEffect(() => {
    randomQuote()
     .then((obj) => {
      const {author, quote} = obj;
      setQuote({quote,author});
      setBgColor(rndCol());
     })
  }, []);
  const myStyles : { [key: string]: CSSProperties } = {
    bigContainer: {
      backgroundColor: bgColor,
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    smallContainer: {
      height: "50vh",
      width: "50vw",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      textAlign: "center",
    }
  };
  return (
    <div style={myStyles.bigContainer}>
      <div style = {myStyles.smallContainer}>
        <h1>{quote.quote}</h1>
        <p>{quote.author}</p>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  )
}

export default App
