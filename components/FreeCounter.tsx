"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { MAX_FREE_COUNTS } from "@/constants";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { ProModal } from "./ProModal";

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentLimit, setCurrentLimit] = useState<number | 0>(apiLimitCount);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false);
  const {userId} = useAuth()

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchLimit = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getLimit?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          setCurrentLimit(data.count); // Update the free count based on API response
        } else {
          toast.error("Failed to fetch limit count");
        }
      } catch (error) {
        toast.error(`Error fetching limit data : ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLimit();
  }, [apiLimitCount, userId]);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null; // No need to show for Pro users
  }

  return (
    <div className="">
      <Card className="bg-white/10 border-0">
        <div className="px-6 py-4">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {currentLimit} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(currentLimit / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            className="w-full"
            variant="premium"
            onClick={() => setIsModalOpen(true)}
            disabled={loading} 
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </div>
        <ProModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
      />
      </Card>
    </div>
  );
};