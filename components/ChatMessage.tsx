import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { UserAvatar, BotAvatar } from './Avatar';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Image from 'next/image';

interface CodeProps {
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
}

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
}

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
        <div className='overflow-x-auto'>
            <code className="bg-gray-300 font-bold text-xs text-red-700 p-1 rounded">
                {children}
            </code>
        </div>
    );
};

const renderers = {
    code,
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
    img: ({ children, src }: { src:string,children: React.ReactNode }) => (
        <Image alt='' width={300} height={300} src={`${src},?safe=true`} className="rounded-md">{children}</Image>
    ),
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={` gap-1 flex flex-col max-w-[100%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex items-center justify-start ${isUser ? ' self-end' : ''
                    }`}>
                    <div className=''>
                        {isUser ? <UserAvatar /> : 
                        <>
                            <BotAvatar />
                        </>}
                    </div>
                </div>
                <div className={`prose prose-sm max-w-none p-4 rounded-lg ${isUser
                    ? 'bg-blue-500 text-white prose-invert'
                    : 'bg-gray-100 text-gray-900'
                    }`}>
                    {!isUser ? <ReactMarkdown
                        className="text-sm flex flex-col gap-2"
                        remarkPlugins={[remarkMath, remarkGfm, remarkToc]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            ...renderers,
                        }}
                    >
                        {content}
                    </ReactMarkdown> : content.length <= 25 ? <ReactMarkdown>
                        {content}
                    </ReactMarkdown> :
                        <>
                            <Accordion type='single' collapsible>
                                <AccordionItem value='1'>
                                    <AccordionTrigger className=' text-ellipsis flex  items-center  p-0'>
                                        <ReactMarkdown>
                                            {`${content.slice(0, 25)}...`}
                                        </ReactMarkdown>
                                    </AccordionTrigger>
                                    <AccordionContent className=' bg-black/30 text-xs text-white  p-2 rounded'>
                                        <ReactMarkdown
                                            className="text-sm overflow-x-auto"
                                        >
                                            {content}
                                        </ReactMarkdown>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};