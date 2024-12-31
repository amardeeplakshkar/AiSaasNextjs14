'use client'

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from 'react-hot-toast';

const ApiLimitComponent = () => {
  const [limitCount, setLimitCount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { userId } = useAuth();

  const handleCheckLimit = async () => {
    const response = await fetch(`/api/user?userId=${userId}`);
    const data = await response.json();
    if (response.ok) {
      const message = data.hasExceededLimit
        ? "Limit exceeded"
        : "Within the free limit";
      toast(message, { icon: '👍' });
    } else {
      toast.error(data.error);
    }
  };

  const handleGetLimit = async () => {
    setErrorMessage(null); // Clear any previous error
    const response = await fetch(`/api/getLimit?userId=${userId}`);
    const data = await response.json();

    if (response.ok) {
      setLimitCount(data.count); // Set the API limit count
      toast.success(`API limit count: ${data.count}`);
    } else {
      setErrorMessage(data.error); // Display error message
      toast.error(data.error); // Show error toast
      setLimitCount(null); // Reset limit count
    }
  };

  const handleIncrementLimit = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("API limit incremented successfully");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div>
      <button className="bg-red-500 p-2 m-1" onClick={handleCheckLimit}>Check API Limit</button>
      <button onClick={handleGetLimit}>Get API Limit</button>
      {limitCount !== null && <p>API limit count: {limitCount}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button className="bg-red-500 p-2 m-1" onClick={handleIncrementLimit}>Increment API Limit</button>
    </div>
  );
};

export default ApiLimitComponent;
