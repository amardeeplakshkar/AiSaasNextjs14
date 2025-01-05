import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from '@clerk/nextjs'
import { usePathname } from "next/navigation";
import { NAVBAR } from "@/constants";

export function BotAvatar() {
  const pathName = usePathname()
  const CurrentIcon = NAVBAR.find(item => item.path === pathName)?.icon || null;
  const CurrentColor = NAVBAR.find(item => item.path === pathName)?.color || null;
  const CurrentLabel = NAVBAR.find(item => item.path === pathName)?.label || null;
  return (
      <div className="flex justify-center gap-1 items-center">
    <Avatar className="h-8 w-8">
      <AvatarImage />
      <AvatarFallback className={`bg-${CurrentColor}/10`}>
      {CurrentIcon ? <CurrentIcon className={`w-4 h-4 text-${CurrentColor}`} /> : "?"}
      </AvatarFallback>
    </Avatar>
    <div className="text-sm">{CurrentLabel}</div>
    </div>
  );
}

export function UserAvatar() {
  const { user } = useUser()

  if (!user) return <div>Not signed in</div>
  return (
    <Avatar className="h-8 w-8 select-none">
      <AvatarImage className="select-none" src={user?.imageUrl} />
      <AvatarFallback className="flex justify-center items-center text-white uppercase font-semibold bg-yellow-500 ">
        {user?.firstName?.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}