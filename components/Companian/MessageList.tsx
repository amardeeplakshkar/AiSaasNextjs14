"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./Message";

interface MessageListProps {
  messages: {
    role: string;
    content: string;
}[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-2">
      <div className="space-y-4">
        {messages.slice(1).map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
    </ScrollArea>
  );
}