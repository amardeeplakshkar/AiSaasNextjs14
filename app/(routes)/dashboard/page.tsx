/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { TOOLS } from "@/constants";
import { useRouter } from "next/navigation"
function dashboardPage() {
  const router = useRouter();
  return (
    <div className="pt-4 h-[92.5dvh]  bg-cover bg-center">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground -mt-2 pb-2 font-light text-sm md:text-lg text-center">
          Chat with the Smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="my-2 px-4 md:px-20 gap-2 lg:px-32  grid grid-cols-2">
        {TOOLS.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 h-full border-black/5 flex  items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex flex-col w-full items-start gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="pt-4 font-semibold w-full flex justify-between items-center">
                <h2 className="line-clamp-1 text-ellipsis text-xs">
                  {tool.label}
                </h2>
                <div className="">
                <ArrowRight />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default dashboardPage;