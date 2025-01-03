'use client';

import React, { KeyboardEvent, useState, ChangeEvent } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import { usePollinationsChat } from "@pollinations/react";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { Paperclip, File, Send } from "lucide-react";
import { useUser } from '@clerk/nextjs';
import SectionCard from "@/components/SectionCard";
import { ProModal } from "@/components/ProModal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface PDFMessage {
  role: string;
  content: string;
}

const App = () => {
  const [pdfText, setPdfText] = useState<string>(""); 
  const [pdfName, setPdfName] = useState<string>(""); 
  const [input, setInput] = useState<string>(""); 
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { sendUserMessage, messages } = usePollinationsChat(
    [{ role: "system", content: "You are a helpful AI assistant." }],
    {
      seed: 42,
      model: "openai",
    }
  );

  
  const extractTextFromPDF = async (file: File) => {
    const fileArrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(fileArrayBuffer).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => {
        if ('str' in item) {
          return item.str;
        }
        return ''; 
      }).join(" ");
      text += pageText + "\n";
    }
    setPdfName(file.name);
    setPdfText(text); 
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      extractTextFromPDF(file);
    }
  };

  const handleIncrementLimit = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id }),
    });

    const data = await response.json();
    if (response.ok) {
    } else {
      toast.error(data.error);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      try {
        const response = await fetch(`/api/user?userId=${user?.id}`);
        const data = await response.json();

        if (response.ok) {
          if (data.hasExceededLimit) {
            setIsModalOpen(true);
            toast.error("You have exceeded your limit.");
          } else {
            const combinedText = `${pdfText}\n${input}`;
            sendUserMessage(combinedText); 
            setInput("");
            handleIncrementLimit();
          }
        } else {
          toast.error(data.error || "An error occurred while checking the limit.");
        }
      } catch (error) {
        toast.error(`${error} : Failed to check the limit. Please try again.`);
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div>
        <div className="flex gap-2">
          <File />
          <h1 className="text-xl font-bold mb-4">PDF AI</h1>
        </div>
        <div className="flex flex-col h-[82dvh]">
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
            {messages.length <= 1 ? (
              <SectionCard />
            ) :
              messages.slice(1).map((msg: PDFMessage, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`p-3 rounded-lg ${msg.role === "user"
                      ? "bg-blue-100 text-blue-900 max-w-[70%]"
                      : "bg-gray-100 text-gray-900 w-[90%]"
                      }`}
                  >
                    {msg.role === "user" ?
                      (pdfName ?
                        <>
                          <Accordion type='single' collapsible>
                            <AccordionItem value='1'>
                              <AccordionTrigger className='bg-zinc-500 text-xs p-2 rounded-md text-white'>
                                <div className="">
                                  {pdfName}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className=' mt-1 bg-black/50 text-xs text-white  p-2 rounded'>
                                <ReactMarkdown
                                  className="text-sm overflow-x-auto"
                                >
                                  {msg.content}
                                </ReactMarkdown>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </>
                        : <div>
                          {msg.content}
                        </div>)
                      : ""
                    }
                    <ReactMarkdown
                      className={"text-sm"}
                      remarkPlugins={[remarkMath, remarkGfm, remarkToc]}
                      rehypePlugins={[rehypeKatex]}
                      components={{
                        p: ({ children }) => <p className="py-1">{children}</p>,
                        table: ({ children }) => (
                          <div className="overflow-x-auto rounded-md  border-gray-300">
                            <table className="table-auto w-full rounded-md ">
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="border border-gray-300 bg-gray-200 p-2 text-left">
                            {children}
                          </th>
                        ),
                        a: ({ href, children }) => (
                          <a href={href} className="text-blue-700 hover:underline" target="" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                        td: ({ children }) => (
                          <td className="border border-gray-300 p-2">{children}</td>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold my-2">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-bold my-2">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-bold my-2">{children}</h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-md font-bold my-2">{children}</h4>
                        ),
                        h5: ({ children }) => (
                          <h5 className="text-sm font-bold my-2">{children}</h5>
                        ),
                        span: ({ children }) => <span className="m-0">{children}</span>,
                        h6: ({ children }) => (
                          <h6 className="text-xs font-bold my-2">{children}</h6>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 space-y-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-5 space-y-2">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-sm">{children}</li>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-blue-500 border-l-4 pl-4 italic text-gray-600 my-4">
                            {children}
                          </blockquote>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                      }}
                    >{msg.role === "user" ? `` : msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
          </div>
          <div className="p-4 border-t flex items-center gap-2">
            <textarea
              value={input}
              onKeyDown={handleKeyPress}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-[200px]"
              rows={1}
            />
            <label
              htmlFor="upload-pdf"
              className="p-[.7rem] bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <Paperclip />
            </label>
            <input
              id="upload-pdf"
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={handleSend}
              className="p-[.7rem] bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send />
            </button>
          </div>
          {pdfName ?
            <p className="bg-black/10 line-clamp-1 p-1 rounded-md">
              <span className="font-bold">SelectedPDF:</span> {pdfName}
            </p>
            : ""}
        </div>
      </div>
      <ProModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default App;
