"use client";
import React, { useState } from "react";
import { usePollinationsImage } from "@pollinations/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { FaDownload, FaInfoCircle } from "react-icons/fa";
import { ChatInput } from "@/components/ChatInput";
import SectionCard from "@/components/SectionCard";

const ImageComponent = () => {
    const [submittedPrompt, setSubmittedPrompt] = useState("");
    const [ratio, setRatio] = useState({ width: 1024, height: 1024 });

    const imageUrl = usePollinationsImage(submittedPrompt, {
        width: ratio.width,
        height: ratio.height,
        seed: 42,
        model: "flux",
        nologo: true,
        enhance: true,
        safe:true,
    }as never);

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

    const handleRatioChange = (e: { target: { value: unknown; }; }) => {
        const value = e.target.value;
        switch (value) {
            case "1:1":
                setRatio({ width: 1024, height: 1024 });
                break;
            case "16:9":
                setRatio({ width: 1280, height: 720 });
                break;
            case "4:3":
                setRatio({ width: 1024, height: 768 });
                break;
            case "9:16":
                setRatio({ width: 720, height: 1280 });
                break;
            default:
                setRatio({ width: 1024, height: 1024 });
        }
    };

    return (
        <div className="flex flex-col h-[92dvh] overflow-x-hidden">
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="max-w-3xl mx-auto overflow-y-auto p-4 space-y-6">
                    <SectionCard />
                    <div className="mt-4 flex flex-col justify-center items-center">
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mr-2">
                                Select Image Ratio:
                            </label>
                            <select
                                onChange={handleRatioChange}
                                className="border rounded-md p-2 text-sm"
                            >
                                <option value="1:1">1:1 (Square)</option>
                                <option value="16:9">16:9 (Wide)</option>
                                <option value="4:3">4:3 (Standard)</option>
                                <option value="9:16">9:16 (Portrait)</option>
                            </select>
                        </div>
                        {submittedPrompt ? (
                            <div className="flex flex-col items-center">
                                <Avatar
                                    className="rounded-md"
                                    style={{
                                        width: `${ratio.width / 3.5}px`,
                                        height: `${ratio.height / 3.5}px`,
                                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <AvatarImage
                                        src={imageUrl}
                                        alt="Generated image"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <AvatarFallback className="rounded-none flex justify-center items-center">
                                        <Skeleton
                                            className="flex flex-col justify-center items-center"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        >
                                            <Loader size="2rem" className="animate-spin" />
                                            <p className="text-xs">DeepAI is Cooking...</p>
                                        </Skeleton>
                                    </AvatarFallback>
                                </Avatar>
                                {!imageUrl ? (
                                    ""
                                ) : (
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
