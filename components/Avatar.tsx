import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BotIcon, UserIcon } from "lucide-react";

export function BotAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage />
      <AvatarFallback>
        <BotIcon/>
      </AvatarFallback>
    </Avatar>
  );
}

export function UserAvatar() {
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage />
        <AvatarFallback className="bg-red-500/25">
          <UserIcon/>
        </AvatarFallback>
      </Avatar>
    );
  }