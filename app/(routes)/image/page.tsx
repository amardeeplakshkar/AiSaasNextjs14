// File: ImageComponent.js
"use client";
import React, { useState } from "react";
import { usePollinationsImage } from "@pollinations/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, Loader } from "lucide-react";
import { FaDownload, FaInfoCircle } from "react-icons/fa";
import SectionHead from "@/components/SectionHead";
import { ChatInput } from "@/components/ChatInput";

const ImageComponent = () => {
    const [submittedPrompt, setSubmittedPrompt] = useState("");

    const imageUrl = usePollinationsImage(submittedPrompt, {
        width: 1024,
        height: 1024,
        seed: 42,
        model: "flux",
        nologo: true,
        enhance: true,
    });

    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement("a");
            link.href = imageUrl;
            link.target = "_blank";
            link.download = "generated-image.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col h-[92dvh] overflow-x-hidden">
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="max-w-3xl mx-auto overflow-y-auto p-4 space-y-6">
                    <SectionHead
                        Icon={ImageIcon}
                        label="Image Generation"
                        about="Unleash the power of imagination with our advanced AI image generator."
                        color="pink-500"
                    />
                    <div className="mt-4 flex justify-center items-center">
                        {submittedPrompt ? (
                            <div className="flex flex-col items-center">
                                <Avatar className="rounded-md h-[18rem] w-[18rem]">
                                    <AvatarImage
                                        src={imageUrl}
                                        alt="Generated image"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "1024px",
                                            maxHeight: "1024px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <AvatarFallback className="rounded-none flex justify-center items-center">
                                        <Skeleton
                                            className="flex flex-col justify-center items-center"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                maxWidth: "1024px",
                                                maxHeight: "1024px",
                                            }}
                                        >
                                            <Loader size='2rem' className="animate-spin" />
                                            <p className="text-xs">EDITH is Cooking...</p>
                                        </Skeleton>
                                    </AvatarFallback>
                                </Avatar>
                                {!imageUrl ? "" : (
                                    <button
                                        onClick={handleDownload}
                                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex justify-center gap-1 items-center"
                                    >
                                        <FaDownload />
                                        Download
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p className="text-[0.65rem] inline-flex gap-1 justify-center items-center text-red-500 p-2 bg-red-500/10 rounded-md">
                                <FaInfoCircle /> Enter a prompt and click Generate to see the image.
                            </p>
                        )}
                    </div>
                </div>
            </main>
            <ChatInput onSend={setSubmittedPrompt} />
        </div>
    );
};

export default ImageComponent;