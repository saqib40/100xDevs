import TextArea from './components/text';
import PreviewArea from './components/preview';
import { useEffect, useState } from 'react';
import './App.css';
import initialMarkdown from './components/initial.md?raw';

function App() {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    setText(initialMarkdown);
  }, []);
  return (
        <div className="app-container">
          <TextArea setText={setText} text={text} />
          <div className="preview-area">
            <PreviewArea text={text} />
          </div>
        </div>
  )
}

export default App;
