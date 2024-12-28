'use client'

import React from 'react';
import { usePollinationsChat } from '@pollinations/react';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import 'katex/dist/katex.min.css';
import { Code } from 'lucide-react';
import SectionHead from '@/components/SectionHead';

function App() {
  const { sendUserMessage, messages } = usePollinationsChat([
    {
      role: "system",
      content: `You are a helpful AI assistant specialized in generating code. Respond only in code blocks with proper syntax for the requested programming language. Do not include explanations, plain text, or comments unless explicitly requested. and must include file names. Built by Amardeep Lakshkar, you are currently in beta version, and your name is Edith. If the prompt is not related to coding or programming, respond with: 'This request seems unrelated to coding. Please visit [conversation mode](/chat) for assistance with general queries.`
    }
  ], {
    seed: 100,
    model: 'openai'
  });

  return (
    <div className="flex flex-col h-[92dvh] overflow-x-hidden">
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-3xl mx-auto overflow-y-auto p-4 space-y-6">
          {messages.length <= 1 ? (
            <SectionHead
              Icon={Code}
              label="Code Generation"
              about="Chat with our AI for quick and efficient code generation."
              color="yellow-500"
            />
          ) : messages.slice(1).map((msg, index) => (
            <ChatMessage
              key={index}
              role={msg.role === 'user' ? 'user' : 'assistant'}
              content={msg.content}
            />
          ))}
        </div>
      </main>

      <ChatInput onSend={sendUserMessage} />
    </div>
  );
}

export default App;