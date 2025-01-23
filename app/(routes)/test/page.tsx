'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaYoutube, FaFilePdf } from 'react-icons/fa';


interface YouTubeData {
    metadata: {
        title: string;
        description: string;
    };
    pageContent: string;
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

const TestPage = () => {
    const [url, setUrl] = useState("");
    const [ytData, setYtData] = useState<YouTubeData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileRemove = () => {
        setYtData(null);
    };

    const handleYoutubeData = async () => {
        if (!url) {
            setError("Please enter a YouTube URL");
            toast.error("Please enter a YouTube URL")
            return;
        }
        setYtData(null);
        setLoading(true);
        setError("");
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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">YouTube Data Loader</h1>
            <Input
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="mt-4"
            />
            <Button onClick={handleYoutubeData} className="block ml-auto mt-2">
                {loading ? "Loading..." : "Load Data"}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {ytData &&
                <div className="self-start">
                    <FileDisplay fileName={ytData?.metadata.title} onClear={handleFileRemove} />
                </div>
            }
            <br />
            <h1>{ytData?.metadata.title || "No title loaded"}</h1>
            <br />
            <p>{ytData?.metadata.description || "No description loaded"}</p>
            <br />
            <p>{ytData?.pageContent || "No data loaded"}</p>
        </div>
    )
}

export default TestPage