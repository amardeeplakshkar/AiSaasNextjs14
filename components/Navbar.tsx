"use client"
import React from 'react'
import { FaBars } from 'react-icons/fa'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from './ui/sheet'
import { Separator } from './ui/separator'
import { usePathname, useRouter } from 'next/navigation'
import { BotIcon, Settings, Wrench } from 'lucide-react'
import { SignedOut, SignInButton, SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { UserAvatar } from './Avatar'
import { Button } from './ui/button'
import { NAVBAR } from '@/constants'
import { FreeCounter } from './FreeCounter'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Navbar = () => {
    const pathName = usePathname();
    const currentLabel = NAVBAR.find(item => item.path === pathName)?.label || '';
    const router = useRouter()
    const { user } = useUser()
    const FirstItem = NAVBAR[0]
    const LastItem = NAVBAR[NAVBAR.length - 1]
    return (
        <>
            <nav className='bg-[#e7f3f2] shadow-lg rounded-full m-1 mb-0 flex justify-between items-center p-1'>
                <div className='bg-green-500/25 rounded-full p-2'><BotIcon /></div>
                <p className='text-sm font-semibold'>
                    {currentLabel}
                </p>
                <div className='flex justify-center items-center'>
                    <SignedOut>
                        <div className='bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
                            <SignInButton signUpForceRedirectUrl={"/dashboard"} />
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <Sheet>
                        <SheetTrigger asChild>
                            <div className="p-2 cursor-pointer"><FaBars /></div>
                        </SheetTrigger>
                        <SheetContent side={"left"} className='text-white flex flex-col bg-emerald-900/80'>
                            <SheetHeader>
                                <SheetTitle className='text-white py-2 flex justify-center items-center gap-2'><BotIcon />EDITH <span className='text-emerald-900  bg-white px-1 rounded-md'>AI</span></SheetTitle>
                            </SheetHeader>
                            <Separator />
                            <section className=' flex flex-1 flex-col gap-2'>
                                <SheetClose asChild>
                                    <Link
                                        href={FirstItem.path}
                                        className={cn(
                                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white transition hover:bg-white/10 rounded-lg",
                                            pathName == FirstItem.path ? "text-white bg-white/10" : "text-white/70"
                                        )}
                                    >
                                        <div className="flex items-center flex-1">
                                            <FirstItem.icon className={cn("h-5 mr-3 w-5", `text-${FirstItem.color}`)} />
                                            {FirstItem.label}
                                        </div>
                                    </Link>
                                </SheetClose>
                                <Accordion type='single' collapsible className='border-y my-2'>
                                    <AccordionItem value='1' className='m-0 p-0'>
                                        <AccordionTrigger className='px-2'>
                                            <p className='flex  justify-start items-center'>
                                            <Wrench className='mr-3 text-yellow-500' />
                                                All Tools
                                            </p>
                                        </AccordionTrigger>
                                        <AccordionContent className='m-0  flex flex-col gap-1'>
                                            {
                                                NAVBAR.map((e, i) =>
                                                    i !== 0 && i !== (NAVBAR.length - 1) ? (
                                                        <div key={i}>
                                                            <SheetClose asChild>
                                                                <Link
                                                                    href={e.path}
                                                                    className={cn(
                                                                        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white transition hover:bg-white/10 rounded-lg",
                                                                        pathName == e.path ? "text-white bg-white/10" : "text-white/70"
                                                                    )}
                                                                >
                                                                    <div className="flex items-center flex-1">
                                                                        <e.icon className={cn("h-5 mr-3 w-5", `text-${e.color}`)} />
                                                                        {e.label}
                                                                    </div>
                                                                </Link>
                                                            </SheetClose>
                                                        </div>
                                                    ) : null
                                                )
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <SheetClose asChild>
                                    <Link
                                        href={LastItem.path}
                                        className={cn(
                                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white transition hover:bg-white/10 rounded-lg",
                                            pathName == LastItem.path ? "text-white bg-white/10" : "text-white/70"
                                        )}
                                    >
                                        <div className="flex items-center flex-1">
                                            <LastItem.icon className={cn("h-5 mr-3 w-5", `text-${LastItem.color}`)} />
                                            {LastItem.label}
                                        </div>
                                    </Link>
                                </SheetClose>
                            </section>
                            <Separator />
                            <FreeCounter apiLimitCount={0} isPro={false} />
                            <Separator />
                            <div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex justify-center items-center gap-2'>
                                        <UserAvatar />
                                        <h3>
                                            {user?.firstName}
                                            <p className='text-xs text-white/75'>
                                                @{user?.username}
                                            </p>
                                        </h3>
                                    </div>
                                    <SheetClose asChild>
                                        <Button onClick={() => router.push("/settings")} variant={'ghost'}>
                                            <Settings />
                                        </Button>
                                    </SheetClose>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </>
    )
}

export default Navbar