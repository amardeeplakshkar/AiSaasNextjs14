'use client'

import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { ProModal } from './ProModal';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');
  const { user } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            onSend(input.trim());
            setInput('');
            handleIncrementLimit()
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
    <div className="border-t bg-white p-4">
      <div className="max-w-3xl mx-auto items-center flex gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px] max-h-[200px]"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className=" p-3 self-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">
        Press Enter to send, Shift + Enter for new line
      </p>
      <ProModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
      />
    </div>
  );
};