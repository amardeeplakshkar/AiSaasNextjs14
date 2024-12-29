import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BotIcon } from "lucide-react";
import { useUser } from '@clerk/nextjs'

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

export  function UserAvatar() {
  const {user} =  useUser()

  if (!user) return <div>Not signed in</div>
    return (
      <Avatar className="h-8 w-8 select-none">
        <AvatarImage className="select-none" src={user?.imageUrl}/>
        <AvatarFallback className="flex justify-center items-center text-white uppercase font-semibold bg-yellow-500 ">
          {user?.firstName?.slice(0,2)}
        </AvatarFallback>
      </Avatar>
    );
  }