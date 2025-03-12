import { marked } from "marked";
import {useState, useEffect} from 'react';
import  DOMPurify  from "dompurify";
import "github-markdown-css/github-markdown-light.css";

interface textPropInter {
    text : string
}

export default function PreviewArea({text} : textPropInter) {
    const [sanitizedHTML, setSanitizedHTML] = useState<string>("");
    useEffect(() => {
        async function getHTML() : Promise<void> {
            marked.setOptions({ breaks: true });
            const html : string = await marked(text);
            const cleanHTML : string = DOMPurify.sanitize(html);
            setSanitizedHTML(cleanHTML);
        }
        getHTML();
    }, [text]);
    return (
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: sanitizedHTML }}/>
    );
}