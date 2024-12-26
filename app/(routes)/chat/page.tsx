/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { usePollinationsChat } from "@pollinations/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";
import SectionHead from "@/components/SectionHead";
import katex from "katex";
import "katex/dist/katex.min.css";

interface CodeProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const ChatComponent = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { sendUserMessage, messages } = usePollinationsChat(
    [
      {
        role: "system",
        content:
          "You are a helpful AI assistant. Built by Amardeep Lakshkar, you are currently in beta version, and your name is Edith.",
      },
    ],
    {
      seed: 42,
      model: "openai",
    }
  );

  const handleSend = async () => {
    if (input.trim()) {
      setLoading(true);
      try {
        await sendUserMessage(input);
        setInput("");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const code = ({ inline, className, children }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeContent = String(children).replace(/\n$/, "");
    return !inline && match ? (
      <div className="relative">
        <SyntaxHighlighter
          style={dracula}
          language={match[1]}
          PreTag="div"
          className="rounded-lg text-xs"
        >
          {codeContent}
        </SyntaxHighlighter>
        <button
          onClick={() => handleCopy(codeContent)}
          className="absolute top-2 right-2 px-2 py-1 bg-white/5 text-white text-xs rounded shadow hover:bg-white/10 transition-colors"
        >
          Copy
        </button>
      </div>
    ) : (
      <code className="bg-gray-300 font-bold text-xs text-red-700 p-1 rounded">
        {children}
      </code>
    );
  };

  const renderers = {
    math: ({ value }: { value: string }) => {
      return <span dangerouslySetInnerHTML={{ __html: katex.renderToString(value, { throwOnError: false }) }} />;
    },
    inlineMath: ({ value }: { value: string }) => {
      return <span className="inline-block">{katex.renderToString(value, { throwOnError: false })}</span>;
    },
    code,
    link: ({ href, children }: { href: string; children: React.ReactNode }) => {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {children}
        </a>
      );
    },
  
    
    image: ({ src, alt }: { src: string; alt: string }) => {
      return <img src={src} alt={alt} className="max-w-full rounded-lg shadow-md" />;
    },
  
    
    blockquote: ({ children }: { children: React.ReactNode }) => {
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">
          {children}
        </blockquote>
      );
    },
  
    
    paragraph: ({ children }: { children: React.ReactNode }) => {
      return <p className="text-gray-800 my-2">{children}</p>;
    },
  
    
    text: ({ children }: { children: React.ReactNode }) => {
      const emojiRegex = /(:[a-zA-Z0-9_]+:)/g;
      const parsedText = String(children).replace(emojiRegex, (match) => {
        return `<span class="emoji">${match}</span>`;
      });
      return <span dangerouslySetInnerHTML={{ __html: parsedText }} />;
    },
  };

  return (
    <div className="flex flex-col h-[90dvh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length <= 1 ? (
            <SectionHead 
              Icon={MessageSquare}
              label="conversation"
              about="Engage in dynamic and insightful chats with our smart AI assistant."
              color="yellow-500"
            /> 
        )
          : messages
            .slice(1)
            .map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[100%] p-3 rounded-lg ${msg.role === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-200 text-gray-900"
                    }`}
                >
                  <span className="mr-2">
                    {msg.role === "user" ? "🐦" : "🌸"}
                  </span>
                  <ReactMarkdown className="text-sm" components={renderers}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
      </div>
      <div className="p-4 border-t flex justify-center items-center gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border rounded-lg"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 transition-colors"
            }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
