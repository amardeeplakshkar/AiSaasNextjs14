'use client'
import { CheckCircle2, LoaderIcon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';

const PricingCard = () => {
    const ProList = [
        {
            item: "Unlimited Credits"
        },
        {
            item: "All Basic features"
        },
        {
            item: "Support for multiple languages"
        },
        {
            item: "Complex queries"
        },
        {
            item: "Proactive assistance"
        },
        {
            item: "Third-party app integrations"
        },
        {
            item: "Support for images"
        }
    ];

    const FreeList = [
        {
            item: "100 Free Credits"
        },
        {
            item: "Basic chat support"
        },
        {
            item: "Support for simple queries"
        },
        {
            item: "Limited language support"
        },
        {
            item: "No third-party app integrations"
        }
    ];

    return (
        <div className='flex text-base sm:flex-row justify-center items-center gap-2 flex-col'>
            <div className='rounded-xl h-full text-white/90 p-4 flex flex-col gap-2 bg-[#243131]'>
                <div className='flex flex-1 justify-between items-center'>
                    <div className='p-1 px-5 border border-[#8ce3bf] rounded-md'>Basic</div>
                    <div>Free</div>
                </div>
                <p>
                    Get started with our Basic Plan, perfect for individuals.
                </p>
                <ul className='space-y-1'>
                    {
                        FreeList.map((item, i) =>
                            <li key={i} className='flex items-center gap-1'><CheckCircle2 className='text-[#8ce3bf]' size={'1rem'} />{item.item}</li>
                        )}
                </ul>
                <button className='border opacity-20 border-[#8ce3bf] p-2 rounded-full'>Free</button>
            </div>

            {/* PRO PRICING CARD */}

            <div className='border rounded-xl  h-full text-white/90 border-[#8ce3bf] p-4 flex flex-col gap-2 bg-[#243131]'>
                <div className='flex flex-1 justify-between items-center'>
                    <div className='p-1 px-5 text-[#243131] bg-[#8ce3bf] rounded-md'>Pro</div>
                    <div><span className='text-xl'>$4.99</span>/month</div>
                </div>
                <p>
                    Upgrade to our Pro Plan: ideal for growing businesses.
                </p>
                <ul className='space-y-1'>
                    {
                        ProList.map((item, i) =>
                            <li key={i} className='flex items-center gap-1'><CheckCircle2 className='text-[#8ce3bf]' size={'1rem'} />{item.item}</li>
                        )}
                </ul>
                <button onClick={() => toast("🔨 Under Development",{
                    icon: <LoaderIcon className='animate-spin'/>
                })} className=' text-[#243131] bg-[#8ce3bf] p-2 rounded-full'>Get Started</button>
            </div>
        </div>
    )
}

export default PricingCard
