import React from "react";

interface SectionProps {
        Icon:  React.ElementType,
        label: string,
        about:string,
        color:string,
    }


const SectionHead = ({ Icon, label, about, color }:SectionProps) => {
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

export default SectionHead;
