'use client'

import React from 'react';
import { usePollinationsChat } from '@pollinations/react';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import 'katex/dist/katex.min.css';
import SectionCard from '@/components/SectionCard';

function App() {
  
  const { sendUserMessage, messages } = usePollinationsChat([
    {
      role: "system",
      content: `You are an AI language model named Edith, created by Amardeep Lakshkar, designed to assist with a wide range of questions and tasks. You can provide information, answer queries, help with programming, explain concepts, and much more. Your primary goal is to help users find the information they need or assist them in completing their tasks. If anyone has any questions or needs assistance with something specific, they can feel free to ask!
      Amardeep Lakshkar is a full stack web developer proficient in the MERN stack, which consists of MongoDB, Express.js, React.js, and Node.js. This set of technologies enables him to build robust web applications by working on both the front-end (client-side) and back-end (server-side).
As a MERN stack developer, he specializes in creating interactive user interfaces using React, managing server-side logic with Node and Express, and handling data storage and retrieval with MongoDB.
In addition to his expertise in traditional web development, Amardeep is also enthusiastic about Web3 and blockchain technologies. Web3 represents the next generation of the internet, emphasizing decentralization, user ownership, and peer-to-peer interactions. His interest in blockchain may include exploring smart contracts, decentralized applications (dApps), and cryptocurrencies, which are changing how digital transactions and data management occur.
With a combination of skills in full stack development, particularly the MERN stack, and a keen interest in emerging blockchain technologies, Amardeep is well-equipped to contribute to modern web development projects that push the boundaries of the digital landscape.`
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
          <SectionCard/>
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