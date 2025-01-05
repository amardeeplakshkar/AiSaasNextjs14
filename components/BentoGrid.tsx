import React from "react";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function BentoGridDemo() {
    return (
        <BentoGrid className="max-w-6xl mx-auto">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    index={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={i === 0 || i === 1 || i === 3 ? " md:row-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}
const Skeleton = () => (
    <div className="flex justify-center items-center">
        <img src="https://kit.sociolib.com/nextchat/wp-content/uploads/sites/11/2024/09/08.webp" alt="" />
    </div>
);
const Skeleton2 = () => (
    <div className="relative flex justify-center items-center">
        <img className='absolute -z-1 right-0 top-5 h-[15rem] w-[15rem]' src="https://kit.sociolib.com/nextchat/wp-content/uploads/sites/11/2024/09/05.png" alt="" />
    </div>
);
const Skeleton3 = () => (
    <div className="relative flex justify-center items-center">
        <img className='' src="https://kit.sociolib.com/nextchat/wp-content/uploads/sites/11/2024/09/07.webp" alt="" />
    </div>
);
const Skeleton4 = () => (
    <div className="flex justify-center items-center">
        <img src="https://kit.sociolib.com/nextchat/wp-content/uploads/sites/11/2024/09/10.webp" alt="" />
    </div>
);
const items = [
    {
        title: "The Power of Communication",
        description:
            "Discover the power of smarter conversations",
        header: <Skeleton />,
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Instant answer",
        description: "Get quick, reliable responses to all your questions—whether you’re curious, stuck on a problem, or need advice.",
        header: <Skeleton3 />,
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Extensive Knowledge",
        description: "Join the quest for understanding and enlightenment.",
        header: <Skeleton2 />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Voice & text chat",
        description: "Switch effortlessly between typing and voice commands, allowing you to chat in the way that’s most convenient for you.",
        header: <Skeleton4 />,
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Experience responses that feel natural",
        description: "Embark on exciting journeys and thrilling discoveries.",
        header: <Skeleton2 />,
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];
