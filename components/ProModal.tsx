"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { TOOLS } from "@/constants";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiLimitReached?: boolean;
}

export const ProModal = ({
  isOpen,
  onClose,
}: ProModalProps) => {

  const [isLimitReached, setIsLimitReached] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useAuth()

  useEffect(() => {
    const checkApiLimit = async () => {
      if (isOpen) {
        setLoading(true);
        try {
          const response = await fetch(`/api/user?userId=${userId}`); // API call to check limit
          const data = await response.json();
          if (response.ok) {
            setIsLimitReached(data.hasExceededLimit); // Set the limit status
          } else {
            setIsLimitReached(false); // Default to false in case of error
          }
        } catch (error) {
          console.error("Error fetching API limit", error);
          setIsLimitReached(false); // Default to false if an error occurs
        } finally {
          setLoading(false);
        }
      }
    };

    checkApiLimit();
  }, [isOpen, userId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="select-none w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Pro
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {loading ? (
              <span>Loading...</span>
            ) : isLimitReached ? (
              <span className="text-red-500">
                You have reached your free API limit. Upgrade to continue generating content.
              </span>
            ) : (
              <span>
                Upgrade to Pro for unlimited generations.
              </span>
            )}
            <div>
              {
                TOOLS.map((e, i) =>
                  <div key={i} className={cn(
                    "text-sm group flex p-3 w-full justify-between font-medium transition  rounded-lg",
                    "text-primary bg-white/10"
                  )}
                  >
                    <div className="flex items-center flex-1 ">
                      <e.icon className={cn("h-5 mr-3 w-5", `${e.color}`)} />
                      {e.label}
                    </div>
                    <Badge variant={"premium"}>Unlimited</Badge>
                  </div>
                )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full"
            onClick={() => console.log("Upgrade button clicked")} // Handle Upgrade button click
            disabled={loading} // Disable button during loading
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};