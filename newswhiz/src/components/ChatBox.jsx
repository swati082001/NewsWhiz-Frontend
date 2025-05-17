import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ChatBox = ({messages}) => {
    
  return (
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`w-fit max-w-[80%] px-4 py-2 rounded-xl break-words ${
              msg.role === "user"
                ? "bg-blue-600 ml-auto text-right"
                : "bg-gray-700"
            }`}
          >
            <div className="prose prose-invert max-w-none text-white">
              <ReactMarkdown
                children={msg.content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              />
            </div>
          </div>
        ))}
      </main>
  )
}

export default ChatBox
