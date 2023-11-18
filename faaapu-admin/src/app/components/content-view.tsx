'use client';

import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

type ContentViewProps = {
  content?: string,
  onContentChanged: (content: string) => void
}

export default function ContentView(props: ContentViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between">
        <h2>Rédaction (Markdown)</h2>
        <h2>Rendu</h2>
      </div>
      <div className="flex flex-row h-full max-h-screen border rounded border-primary items-stretch gap-2">
        <textarea className="flex-1 p-2 resize-none" value={props.content} onChange={(e) => props.onContentChanged(e.target.value)}></textarea>
        <div className="flex-1 overflow-auto p-2">
          <Markdown remarkPlugins={[remarkGfm]}>{props.content}</Markdown>
        </div>
      </div>
    </div>
  );
}