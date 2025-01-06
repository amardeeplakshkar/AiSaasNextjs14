'use client';

import { Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface AISpeechProps {
  text: string;
}

const AISpeech: React.FC<AISpeechProps> = ({ text }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const hindiVoice = availableVoices.find(
        (voice) =>
          voice.lang.startsWith("hi-") || voice.name.toLowerCase().includes("hindi")
      );

      if (hindiVoice) {
        setSelectedVoice(hindiVoice.name);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();

    if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSpeak = () => {
    if (text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text);

      if (selectedVoice) {
        const voice = voices.find((voice) => voice.name === selectedVoice);
        if (voice) {
          utterance.voice = voice;
        }
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
      <Button variant={"ghost"} className="p-2" onClick={handleSpeak}>
        <Volume2 />
      </Button>
  );
};

export default AISpeech;
