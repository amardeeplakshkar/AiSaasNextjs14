import React from "react";
import { NAVBAR } from "@/constants";
import { usePathname } from "next/navigation";

interface SectionProps {
  Icon: React.ElementType;
  label: string;
  about: string;
  color: string;
}

const SectionHead = ({ Icon, label, about, color }: SectionProps) => {
  return (
    <div className="flex justify-center gap-2 items-center w-full bg-zinc-500/10 rounded-md p-4">
      <div className={`p-2 rounded-md bg-${color}/10`}>
        <Icon className={`text-${color}`} size={"2rem"} />
      </div>
      <div>
        <h2 className="text-xl font-semibold capitalize">{label}</h2>
        <p className="text-xs text-muted-foreground">{about}</p>
      </div>
    </div>
  );
};

const SectionCard = () => {
  const pathName = usePathname();
  const currentPath = pathName;

  const currentSection = NAVBAR.find((section) => section.path === currentPath);

  if (!currentSection) {
    return <p className="text-center text-muted-foreground">No section found for this path.</p>;
  }

  const { icon: Icon, label, about, color } = currentSection;

  return <SectionHead Icon={Icon} label={label} about={about || ""} color={color || "zinc-500"} />;
};

export default SectionCard;
