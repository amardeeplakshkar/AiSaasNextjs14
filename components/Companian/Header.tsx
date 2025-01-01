import Image from "next/image";
import { Companion } from "@/lib/companions";

interface CompanionHeaderProps {
  companion: Companion;
}

export function CompanionHeader({ companion }: CompanionHeaderProps) {
  return (
    <div className="flex items-center p-4 border-b">
      <div className="relative h-10 w-10 aspect-square mr-4">
        <Image
          src={companion.image}
          alt={companion.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">{companion.name}</h2>
        <p className="text-xs text-muted-foreground">{companion.description}</p>
      </div>
    </div>
  );
}