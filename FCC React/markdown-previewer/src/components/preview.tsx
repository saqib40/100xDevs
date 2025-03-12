// something important
// starry-night isn't a good option
// large bundle size and hard to configure
// only reason included here is to match github's readme format

import { marked } from "marked";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { createStarryNight, common } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";
import "github-markdown-css/github-markdown-light.css";

interface textPropInter {
  text: string;
}

export default function PreviewArea({ text }: textPropInter) {
  const [sanitizedHTML, setSanitizedHTML] = useState<string>("");

  useEffect(() => {
    async function getHTML(): Promise<void> {
      marked.setOptions({
        breaks: true
      });
      const html = await marked(text);
      const starryNight = await createStarryNight(common);

      // Find all code blocks
      const codeBlocks = html.match(/<pre><code class="language-([\w-]+)">([\s\S]*?)<\/code><\/pre>/g);
      let processedHtml = html;
      // this if-statement processing logic => all thanks to chatgpt & grok & wooorm who created starry-night
      if (codeBlocks) {
        for (const block of codeBlocks) {
          const langMatch = block.match(/language-([\w-]+)/);
          const codeMatch = block.match(/<code class="[^"]+">([\s\S]*?)<\/code>/);

          if (langMatch && codeMatch) {
            const lang = langMatch[1];
            const escapedCode = codeMatch[1];

            // Robust unescaping of HTML entities
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<!DOCTYPE html><body>${escapedCode}`, "text/html");
            const code = doc.body.textContent || ""; // Extracts raw text, unescapes entities

            const scope = starryNight.flagToScope(lang) || "text.plain";
            const highlighted = starryNight.highlight(code, scope);
            const highlightedHtml = toHtml(highlighted);

            // Replace with highlighted version
            processedHtml = processedHtml.replace(block, `<pre><code class="language-${lang}">${highlightedHtml}</code></pre>`);
          }
        }
      }
      const cleanHTML = DOMPurify.sanitize(processedHtml);
      setSanitizedHTML(cleanHTML);
    }

    getHTML();
  }, [text]);

  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  );
}