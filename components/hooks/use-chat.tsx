"use client";

import { usePollinationsChat } from "@pollinations/react";
import { useCallback } from "react";

export function useChat(systemMessage: string) {
  const { sendUserMessage, messages } = usePollinationsChat(
    [{ role: "system", content: systemMessage }],
    {
      seed: 42,
      model: "openai",
    }
  );

  const sendMessage = useCallback(
    (message: string) => {
      sendUserMessage(message);
    },
    [sendUserMessage]
  );

  return {
    messages,
    sendMessage,
  };
}