"use client";

import React, { useState } from "react";
import { usePollinationsChat } from "@pollinations/react";
import { MessageList } from "./MessageList";
import { ChatInput } from "../ChatInput";

interface ChatComponentProps {
    systemMessage: string;
}


export function ChatComponent({ systemMessage }: ChatComponentProps) {
    const [currentModel, setCurrentModel] = useState<string>("openai");

    const handleToggleModel = () => {
      setCurrentModel((prevModel) => (prevModel === "openai" ? "searchgpt" : "openai"));
    };
    const PropmtMessage = `
        Your responses should be natural, casual, and engaging, similar to how a human would respond in everyday conversations.
        Keep your tone friendly, approachable, and avoid overly formal or robotic language.
        If you don’t know the answer to something, it’s okay to say so or ask for clarification.
        Use contractions (e.g., "I'm" instead of "I am"), and feel free to add small conversational elements like "That's interesting!"
        or "Hmm, I see!" to make your replies sound more human. The goal is to make the conversation feel fluid and human-like.
        ${systemMessage}
    `;
    const { sendUserMessage, messages } = usePollinationsChat(
        [{ role: "system", content: PropmtMessage }],
        {
            seed: 42,
            model: currentModel
        }
    );

    return (
        <div className="flex flex-col h-[82dvh] overflow-x-hidden">
                <MessageList messages={messages} />
            <div className="mt-auto">
            <ChatInput onSend={sendUserMessage}
        currentModel={currentModel}
        onToggleModel={handleToggleModel} />
            </div>
        </div>
    );
}
