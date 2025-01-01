"use client"
import { CompanionGrid } from "@/components/Companian/Grid";
import SectionCard from "@/components/SectionCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="flex flex-col h-[92dvh] overflow-x-hidden">
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-3xl mx-auto overflow-y-auto p-4 space-y-6">
          <SectionCard />
        </div>
        <ScrollArea className="h-[70dvh] rounded-md">
      <CompanionGrid />
        </ScrollArea>
      </main>
    </div>
  );
}