import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:rows-[18rem] grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    header,
    title,
    description,
    icon,
    index,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    index?: number;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input shadow-none px-4 bg-[#1c2726] border-white/[0.2] border  justify-between flex flex-col space-y-4 overflow-hidden min-h-[150px]",
                index === 2 || index === 4 ?"":"",
                className
            )}
        >
            {
                index === 1 || index === 2 || index === 4 ?
                    header
                    : ""
            }
            <div className="relative  group-hover/bento:translate-x-2  py-4 transition duration-200">
                {icon}
                <div className="font-sans font-bold  text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal  text-xs text-neutral-300">
                    {description}
                </div>
            </div>
            {
                index !== 1 && index !==4 && index !==2 ?
                header
                : ""
            }
        </div>
    );
};
