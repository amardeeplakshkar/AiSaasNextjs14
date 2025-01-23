'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface YouTubeData {
    metadata: {
        title: string;
        description: string;
    };
    pageContent: string;
}

const TestPage = () => {
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
            <h1>{ytData?.metadata.title || "No title loaded"}</h1>
            <p>{ytData?.metadata.description || "No description loaded"}</p>
            <p>{ytData?.pageContent || "No data loaded"}</p>
        </div>
    )
}

export default TestPage