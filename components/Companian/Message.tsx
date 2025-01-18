"use client";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import 'katex/dist/katex.css';
interface ChatMessageProps {
  message: {
    role: string;
    content: string;
};
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
         className="prose dark:prose-invert text-sm flex justify-center items-center flex-col gap-2"
         components={{
            math: ({ value }) => (
                <div className="my-4 flex justify-center">
                  <span>{value}</span>
                </div>
              ),
              inlineMath: ({ value }) => (
                <span className="mx-1">{value}</span>
              ),
          p: ({ children }) => <p className="">{children}</p>,
          table: ({ children }: { children: React.ReactNode }) => (
            <div className="overflow-x-auto rounded-md  border-gray-300">
                <table className="table-auto w-full rounded-md ">
                    {children}
                </table>
            </div>
        ),
        th: ({ children }: { children: React.ReactNode }) => (
            <th className="border border-gray-300 bg-gray-200 p-2 text-left">
                {children}
            </th>
        ),
        a: ({ href, children }: { href: string; children: React.ReactNode }) => (
            <a href={href} className="text-blue-700 hover:underline" target="" rel="noopener noreferrer">
                {children}
            </a>
        ),
        td: ({ children }: { children: React.ReactNode }) => (
            <td className="border border-gray-300 p-2">{children}</td>
        ),
        h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="text-2xl font-bold my-2">{children}</h1>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-xl font-bold my-2">{children}</h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <h3 className="text-lg font-bold my-2">{children}</h3>
        ),
        h4: ({ children }: { children: React.ReactNode }) => (
            <h4 className="text-md font-bold my-2">{children}</h4>
        ),
        h5: ({ children }: { children: React.ReactNode }) => (
            <h5 className="text-sm font-bold my-2">{children}</h5>
        ),
        span: ({ children }: { children: React.ReactNode }) => <span className="m-0">{children}</span>,
        h6: ({ children }: { children: React.ReactNode }) => (
            <h6 className="text-xs font-bold my-2">{children}</h6>
        ),
        ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc pl-5 space-y-2">{children}</ul>
        ),
        ol: ({ children }: { children: React.ReactNode }) => (
            <ol className="list-decimal pl-5 space-y-2">{children}</ol>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <li className="text-sm">{children}</li>
        ),
        blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote className="border-blue-500 border-l-4 pl-4 italic text-gray-600 my-4">
                {children}
            </blockquote>
        ),
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em className="italic">{children}</em>
        ),
      }}
         >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
