"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./Message";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: {
    role: string;
    content: string;
}[];
}


export function MessageList({ messages }: MessageListProps) {
  const latestMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (latestMessageRef.current) {
        latestMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages]);
  return (
    <ScrollArea className="flex-1 p-2">
      <div className="space-y-4">
        {messages.slice(1).map((msg, index) => (
           <div
           key={index}
           ref={index === messages.length - 2 ? latestMessageRef : null} 
       >
         <ChatMessage key={index} message={msg} />
       </div>
        ))}
      </div>
    </ScrollArea>
  );
}