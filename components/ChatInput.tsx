/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, KeyboardEvent, useRef } from 'react';
import { Mic, Send, XIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { ProModal } from './ProModal';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose } from './ui/drawer';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');
  const { user } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const lastFinalTranscriptRef = useRef<string>("");

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        
        const results = event.results;
        const lastResultIndex = results.length - 1;
        const lastResult = results[lastResultIndex];

        
        if (lastResult.isFinal) {
          const finalTranscript = lastResult[0].transcript.trim();

          
          if (finalTranscript !== lastFinalTranscriptRef.current) {
            lastFinalTranscriptRef.current = finalTranscript;
            setTranscript(finalTranscript);
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error(`Speech recognition error: ${event.error} `);
      };

      
      lastFinalTranscriptRef.current = "";
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      toast.error('Speech recognition not supported in this browser');
    }
  };

  const stopListening = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);

      if (transcript.trim()) {
        try {
          const response = await fetch(`/api/user?userId=${user?.id}`);
          const data = await response.json();

          if (response.ok) {
            if (data.hasExceededLimit) {
              setIsModalOpen(true);
              toast.error("You have exceeded your limit.");
            } else {
              onSend(transcript.trim());
              handleIncrementLimit()
              
            }
          } else {
            toast.error(data.error || "An error occurred while checking the limit.");
          }
        } catch (error) {
          toast.error(`${error} : Failed to check the limit. Please try again.`);
        }
      }
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    lastFinalTranscriptRef.current = "";
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
      <div className="max-w-3xl mx-auto items-center flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px] max-h-[200px]"
          rows={1}
        />
        <Drawer>
          <DrawerTrigger>
            <div className=' p-3 self-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
              <Mic />
            </div>
          </DrawerTrigger>
          <DrawerContent className='rounded-t-2xl'>
            <DrawerTitle>
            </DrawerTitle>
            <div className="flex flex-row gap-5 my-3">
              {/* Speech Recognition Section */}
              <div className="flex-1 p-5 flex flex-col">
                <div className="flex justify-center items-center mb-3"><Mic size={'2.5rem'} className='text-emerald-700' /></div>
                <div className="flex-1 flex justify-center items-center overflow-y-auto break-words mb-3">
                  {transcript ? transcript : "Transcription will appear here..."}
                </div>
                <div className="flex justify-center items-center space-x-3">
                  {!isListening ? (

                    <button
                      onClick={startListening}
                      className="rounded-full bg-green-500  text-white p-2 shadow-md hover:bg-green-600 transition"
                    >
                      <Mic />
                    </button>
                  ) : (
                    <DrawerClose asChild>
                      <button
                        onClick={stopListening}
                        className="rounded-full bg-blue-500 text-white p-2 shadow-md hover:bg-blue-600 transition"
                      >
                        <Send />
                      </button>
                    </DrawerClose>
                  )}
                  <DrawerClose asChild>
                    <button
                      onClick={clearTranscript}
                      className="rounded-full bg-red-500 text-white p-2 shadow-md hover:bg-red-600 transition"
                    >
                      <XIcon />
                    </button>
                  </DrawerClose>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-3 self-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send />
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">
        Press Enter to send, Shift + Enter for new line
      </p>
      <ProModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};