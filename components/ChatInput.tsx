/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import React, { useState, KeyboardEvent, useRef, ChangeEvent } from 'react';
import { Globe, Link, Loader2, Mic, Paperclip, Send, Sparkles, X, XIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { ProModal } from './ProModal';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose } from './ui/drawer';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import TooltipBox from "./Tooltip";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaFilePdf, FaYoutube } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

interface YouTubeData {
  metadata: {
    title: string;
    description: string;
  };
  pageContent: string;
}

interface ChatInputProps {
  onSend: (message: string) => void;
  currentModel?: string; // Pass the current model name (e.g., "openai" or "searchgpt")
  onToggleModel?: () => void; // Function to toggle the model
}
interface FileDisplayProps {
  fileName: string;
  onClear: () => void;
}

const FileDisplay = ({ fileName, onClear }: FileDisplayProps) => (
  <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 w-fit px-3 py-1 rounded-lg group">
    {
      fileName.endsWith('.pdf') ?
      <FaFilePdf size={24} className="dark:text-white" />
      : <FaYoutube size={24}/>
    }
    <span className="text-sm dark:text-white line-clamp-1">{fileName}</span>
    <button
      type="button"
      onClick={onClear}
      className="ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
    >
      <X className="w-3 h-3 dark:text-white" />
    </button>
  </div>
);

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, onToggleModel, currentModel }) => {
  const [input, setInput] = useState('');
  const { user } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const lastFinalTranscriptRef = useRef<string>("");
  const [pdfText, setPdfText] = useState<string>("");
  const [pdfName, setPdfName] = useState<string>("");
  const pathname = usePathname()

  const [url, setUrl] = useState("");
  const [ytData, setYtData] = useState<YouTubeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleYoutubeData = async () => {
    if (!url) {
      setError("Please enter a YouTube URL");
      toast.error("Please enter a YouTube URL")
      return;
    }
    setYtData(null);
    setLoading(true);
    setError("");
    setPdfText("");
    setPdfName("");
    try {
      const response = await fetch('/api/youtube-loader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setYtData(result.docs[0]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

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
    setYtData(null);
    setPdfName(file.name);
    setPdfText(text);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      extractTextFromPDF(file);
    }
  };

  const handleFileRemove = () => {
    setPdfText("");
    setPdfName("");
    setYtData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input field
      console.log('File input reset.');
    }
  };

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
              const combinedText = `${pdfText}\n${transcript}`;
              onSend(combinedText.trim());
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
            const combinedText = `${input} \n ${pdfText} \n ${ytData ? `Youtube Video Content: ${ytData?.pageContent}` : ""}`;
            onSend(combinedText);
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

  const handlePropmtEnchance = async () => {
    if (input.trim()) {
      toast("loading...", {
        icon: <Loader2 className="animate-spin h-5 w-5" />
      })
      try {
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(input)}?system=enhance this propmt and make sure no other commentry needed just return enhanced prompt thats it and also dont respond to user query your work is just enhance input propmt thats it dont need anything extra.`);
        const data = await response.text();
        setInput(data.trim());
        toast.success("🎉Prompt Enhanced!")
      } catch (error) {
        console.error("Error fetching AI response:", error);
        toast.error("Error generating response");
      }
    } else {
      toast.error("Input Prompt For Enhance It")
    }
  }



  return (
    <div className="border-t p-4" suppressHydrationWarning>
      <div className="w-full bg-primary/5 max-w-3xl mx-auto p-3 rounded-lg items-center flex flex-col gap-2">
        {pdfName ?
          <div className="self-start">
            <FileDisplay fileName={pdfName} onClear={handleFileRemove} />
          </div>
          :
          ytData &&
          <div className="self-start">
            <FileDisplay fileName={ytData?.metadata.title} onClear={handleFileRemove} />
          </div>
        }

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="w-full bg-transparent resize-none rounded-lg border-gray-300 p-3 outline-none min-h-[60px] max-h-[200px]"
          rows={2}
        />
        <div className={`flex justify-between w-full ${pathname === "/image" && "flex-col"
          }`}>
          {
            pathname !== "/image" &&
            <div className='flex justify-center items-center gap-2'>
              <label
                htmlFor="upload-pdf"
                className="group cursor-pointer rounded-lg p-2 bg-black/5 dark:bg-white/5"
              >
                <Paperclip className="text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </label>
              <input
                id="upload-pdf"
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />

              <TooltipBox content="Ask From YouTube Video">
                <Dialog>
                  <DialogTrigger className="group cursor-pointer rounded-lg p-2 bg-black/5 dark:bg-white/5">
                    <div className="text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {
                        loading ?
                          <Loader2 className="animate-spin cursor-not-allowed" /> :
                          <Link />
                      }
                    </div>
                  </DialogTrigger>
                  <DialogContent className='rounded-2xl p-4 w-[95%]'>
                    <DialogTitle>
                    </DialogTitle>
                    <DialogDescription>
                    <Input
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL"
                      className="mt-4"
                    />
                    <DialogClose asChild>
                      <Button onClick={handleYoutubeData} className="block ml-auto mt-2">
                        {loading ? "Loading..." : "Load Data"}
                      </Button>
                    </DialogClose>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </TooltipBox>

              <TooltipBox content="Enhance Prompt">
                <div onClick={handlePropmtEnchance} className='group cursor-pointer rounded-lg p-2 bg-black/5 dark:bg-white/5'>
                  <Sparkles className="text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </div>
              </TooltipBox>
              <TooltipBox content="Switch to Search Model">
                <div onClick={onToggleModel}>
                  <span className={`cursor-pointer rounded-full p-2 border bg-black/5 dark:bg-white/5 transition-all flex items-center gap-2 ${currentModel === "searchgpt" && "border bg-sky-500/15 border-sky-400 text-sky-500"}`}>
                    <div className="flex items-center justify-center flex-shrink-0">
                      <motion.div
                        animate={{
                          rotate: currentModel === "searchgpt" ? 180 : 0,
                          scale: currentModel === "searchgpt" ? 1.1 : 1,
                        }}
                        whileHover={{
                          rotate: currentModel === "searchgpt" ? 180 : 15,
                          scale: 1.1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 25,
                        }}
                      >
                        <Globe
                          className={cn(
                            currentModel === "searchgpt"
                              ? "text-sky-500"
                              : "text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors"
                          )}
                        />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {currentModel === "searchgpt" && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{
                            width: "auto",
                            opacity: 1,
                          }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm overflow-hidden whitespace-nowrap text-sky-500 flex-shrink-0"
                        >
                          Search
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </div>
              </TooltipBox>
            </div>
          }
          <div className='flex justify-end items-center gap-2'>
            <Drawer>
              <DrawerTrigger className="">
                <TooltipBox content="Voice Input">
                  <div className='group -mb-2 cursor-pointer rounded-lg p-2 bg-black/5 dark:bg-white/5'>
                    <Mic className="text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  </div>
                </TooltipBox>
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
              className="p-2 self-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send />
            </button>
          </div>
        </div>
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
