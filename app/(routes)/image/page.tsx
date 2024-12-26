"use client";
import React, { useState } from "react";
import { usePollinationsImage } from "@pollinations/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, Loader } from "lucide-react";
import { FaInfoCircle } from "react-icons/fa";
import SectionHead from "@/components/SectionHead";

const ImageComponent = () => {
    const [prompt, setPrompt] = useState("");
    const [submittedPrompt, setSubmittedPrompt] = useState("");

    const handleGenerate = () => {
        if (prompt.trim()) {
                setSubmittedPrompt(prompt.trim());
        }
    };

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
            link.download = "generated-image.png";
            link.click();
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2 p-4 py-2">
              <SectionHead
              Icon={ImageIcon}
              label="Image Generation"
              about="Unleash the power of imagination with our advanced AI image generator."
              color="pink-500"
            /> 
            <div className="flex gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your image prompt..."
                    className="p-2 border rounded-lg w-full"
                />
                <button
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Generate
                </button>
            </div>
            <div className="mt-4">
                {submittedPrompt ? (
                    <div className="flex flex-col items-center">
                        <Avatar className="rounded-md  h-[18rem] w-[18rem]">
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
                                }} >
                                    <Loader size='2rem' className="animate-spin"/>
                                    <p className="text-xs">EDITH is Cooking...</p>
                                </Skeleton>
                            </AvatarFallback>
                        </Avatar>
                        <button
                            onClick={handleDownload}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Download
                        </button>
                    </div>
                ) : (
                    <p className="text-[0.65rem] inline-flex gap-1 justify-center items-center text-red-500 p-2 bg-red-500/10 rounded-md"> <FaInfoCircle /> Enter a prompt and click Generate to see the image.</p>
                )}
            </div>
        </div>
    );
};

export default ImageComponent;
