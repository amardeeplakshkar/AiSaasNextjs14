import { ChatPageClient } from "@/components/Companian/ChatPage";
import { companions } from "@/lib/companions";
import { Metadata } from "next";

// Generate static paths for companions
export function generateStaticParams(): { companionId: string }[] {
  return companions.map((companion) => ({
    companionId: companion.id,
  }));
}

export type paramsType = Promise<{ companionId: string }>;

interface PageProps {
  params: paramsType;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { companionId } = await params;
  const companion = companions.find((c) => c.id === companionId);

  return {
    title: companion ? `Chat with ${companion.name}` : "Companion Not Found",
    description: companion?.description || "AI Companion Chat",
  };
}

export default async function Page({ params }: PageProps) {
  const { companionId } = await params;
  const companion = companions.find((c) => c.id === companionId);

  if (!companion) {
    console.error(`No companion found for ID: ${companionId}`);
    return <div>Companion not found</div>;
  }

  return <ChatPageClient companion={companion} />;
}
