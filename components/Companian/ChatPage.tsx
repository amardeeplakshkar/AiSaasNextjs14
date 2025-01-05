"use client";

import { Companion } from "@/lib/companions";
import { ChatComponent } from "@/components/Companian/ChatContainer";
import { CompanionHeader } from "./Header";

interface ChatPageClientProps {
    companion: Companion;
}

export function ChatPageClient({ companion }: ChatPageClientProps) {
    return (
            <div className="max-w-4xl mx-auto">
                <CompanionHeader companion={companion}/>
                <ChatComponent systemMessage={companion.systemMessage} />
            </div>
    );
}