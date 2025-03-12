//import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
//import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown"; // Markdown mode
import "ace-builds/src-noconflict/theme-terminal"; // A dark theme similar to atomDark

interface textPropInter {
    text: string,
    setText : React.Dispatch<React.SetStateAction<string>>
}

export default function TextArea({text, setText} : textPropInter) {
    return (
        <div className="text-area">
          <AceEditor
                mode="markdown" // Language mode
                theme="terminal" // Dark theme
                value={text} // Controlled value
                onChange={(newText) => setText(newText)} // Update state on change
                name="text-editor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                    showPrintMargin: false, // that annoying vertival line
                    wrap: true,
                    scrollPastEnd: true,
                }}
                style={{
                  padding: "1rem",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  overflow: "auto"
                }}
                // directly setting certain values
                fontSize={16} //in pixels
                width="95%"
                height="100%"
                readOnly={false} // Ensure it’s editable and selectable
                highlightActiveLine={true}
            />
        </div>
    );
}