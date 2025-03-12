import TextArea from './components/text';
import PreviewArea from './components/preview';
import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState<string>("");
  return (
    <div className="app-container">
        <TextArea setText={setText} text={text} />
      <div className="preview-area">
        <PreviewArea text={text} />
      </div>
    </div>
  )
}

export default App
