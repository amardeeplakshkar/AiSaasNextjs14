"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Infinity, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { TOOLS } from "@/constants";
import toast from "react-hot-toast";

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
          const response = await fetch(`/api/user?userId=${userId}`);
          const data = await response.json();
          if (response.ok) {
            setIsLimitReached(data.hasExceededLimit);
          } else {
            setIsLimitReached(false);
          }
        } catch (error) {
          console.error("Error fetching API limit", error);
          setIsLimitReached(false);
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
            <span className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Pro
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </span>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
          <span className="my-2">
          {loading ? (
              <span>Loading...</span>
            ) : isLimitReached ? (
              <span className="text-red-500">
                You have reached your free API limit. Upgrade to continue generating content.
              </span>
            ) : (
              <span className="text-primary">
                Upgrade to Pro for unlimited generations.
              </span>
            )}
          </span>
            <span className="my-2">
              {
                TOOLS.map((e, i) =>
                  <span key={i} className={cn(
                    "text-sm group flex my-2 p-3 w-full justify-between font-medium transition  rounded-lg",
                    "text-primary bg-white/10"
                  )}
                  >
                    <span className="flex text-xs items-center flex-1 ">
                      <e.icon className={cn("h-5 mr-3 w-5", `${e.color}`)} />
                      {e.label}
                    </span>
                    <Badge variant={"premium"}>
                        <Infinity/>
                    </Badge>
                  </span>
                )}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full"
            onClick={() => toast('Feature will be introduced in the next update!', {
              icon: '👏',
            })}
            disabled={loading}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
