"use client"
import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from './ui/sheet'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { BotIcon, Code, ImageIcon, LayoutDashboard, MessageSquare } from 'lucide-react'

const NAVBAR = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        color: "text-sky-500",
      },
      {
        label: "Conversation",
        icon: MessageSquare,
        path: "/chat",
        color: "text-yellow-500",
      },
      {
        label: "Image Generation",
        icon: ImageIcon,
        path: "/image",
        color: "text-pink-500",
      },
    //   {
    //     label: "Video Generation",
    //     icon: VideoIcon,
    //     path: "/video",
    //     color: "text-orange-500",
    //   },
    //   {
    //     label: "Music Generation",
    //     icon: Music,
    //     path: "/music",
    //     color: "text-emerald-500",
    //   },
      {
        label: "Code Generation",
        icon: Code,
        path: "/code",
        color: "text-green-500",
      },
]

const Navbar = () => {
    const pathName = usePathname();
    return (
        <>
            <nav className='bg-green-100 rounded-full m-1 flex justify-between items-center p-1'>
                <div className='bg-black/10 rounded-full p-2'><BotIcon /></div>
                <Sheet>
                    <SheetTrigger asChild>
                        <div className="p-2 cursor-pointer"><FaBars /></div>
                    </SheetTrigger>
                    <SheetContent side={"left"} className='text-white bg-emerald-900/80'>
                        <SheetHeader>
                            <SheetTitle className='text-white py-2 flex justify-center items-center gap-2'><BotIcon/>EDITH AI</SheetTitle>
                        </SheetHeader>
                        <Separator />
                        <section className='py-2 flex flex-col gap-2'>
                            {
                                NAVBAR.map((e) =>
                                    <SheetClose asChild key={e.path}>
                                        <Link
                                        href={e.path}
                                        className={cn(
                                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white transition hover:bg-white/10 rounded-lg",
                                            pathName == e.path ? "text-white bg-white/10" : "text-white/70"
                                        )}
                                    >
                                        <div className="flex items-center flex-1 ">
                                            <e.icon className={cn("h-5 mr-3 w-5", e.color)} />
                                            {e.label}
                                        </div>
                                    </Link>
                                    </SheetClose>
                                )
                            }
                        </section>
                        <SheetFooter>

                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    )
}

export default Navbar