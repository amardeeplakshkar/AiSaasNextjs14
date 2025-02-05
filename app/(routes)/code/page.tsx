'use client'

import React, { useEffect, useRef, useState } from 'react';
import { usePollinationsChat } from '@pollinations/react';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import 'katex/dist/katex.min.css';
import SectionCard from '@/components/SectionCard';

function App() {
    const [currentModel, setCurrentModel] = useState<string>("openai");
    const latestMessageRef = useRef<HTMLDivElement | null>(null);

    const handleToggleModel = () => {
      setCurrentModel((prevModel) => (prevModel === "openai" ? "searchgpt" : "openai"));
    };
  const { sendUserMessage, messages } = usePollinationsChat([
    {
      role: "system",
      content: `You are a helpful AI assistant specialized in generating code. Respond only in code blocks with proper syntax for the requested programming language. Do not include explanations, plain text, or comments unless explicitly requested. and must include file names. Built by Amardeep Lakshkar, you are currently in beta version, and your name is DeepAI. If the prompt is not related to coding or programming, respond with: 'This request seems unrelated to coding. Please visit [conversation mode](/chat) for assistance with general queries.

       When writing mathematical formulas, use LaTeX syntax with single dollar signs for inline math and double dollar signs for display math.
      `
    }
  ], {
    seed: 100,
    model: currentModel
  });

  useEffect(() => {
    if (latestMessageRef.current) {
        latestMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}, [messages]);

  return (
    <div className="flex flex-col h-[92dvh] overflow-x-hidden">
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-3xl mx-auto overflow-y-auto p-4 space-y-6">
          {messages.length <= 1 ? (
           <SectionCard/>
          ) : messages.slice(1).map((msg, index) => (
            <div
                            key={index}
                            ref={index === messages.length - 2 ? latestMessageRef : null} // Attach ref to the wrapper div of the latest message
                        >
                            <ChatMessage
                                role={msg.role === 'user' ? 'user' : 'assistant'}
                                content={msg.content}
                            />
                        </div>
          ))}
        </div>
      </main>

      <ChatInput onSend={sendUserMessage}
        currentModel={currentModel}
        onToggleModel={handleToggleModel} />
    </div>
  );
}

export default App;
