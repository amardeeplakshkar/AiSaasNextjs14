"use client"
import BentoGridDemo from '@/components/BentoGrid'
import useRedirectAfterAuth from '@/components/hooks/useRedirectAfterAuth'
import PricingCard from '@/components/PricingCard'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const LandingPage = () => {
  useRedirectAfterAuth();
  const router = useRouter()
  return (
    <>
      <div style={{ backgroundImage: "url('https://kit.sociolib.com/nextchat/wp-content/uploads/sites/11/2024/09/Line-grid.png')" }} className='text-secondary bg-cover bg-blend-screen bg-center w-dvw'>
        <div className="min-h-screen bg-gradient-to-b to-chat-dark from-[#194439] ">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl capitalize font-bold text-white mb-6">
                  Connect, chat, and explore Deeper with <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 bg-clip-text text-transparent'>DeepAI</span>
                </h1>
                <p className="text-gray-300 text-lg mb-8">
                  Experience a new way to chat — where conversations are smarter,
                  faster, and more personalized than ever before.
                </p>
                <button onClick={() => router.push("/dashboard")} className="bg-emerald-500 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-colors">
                  Get Started
                </button>
              </div>

              <div className="sm:mt-14 relative rounded-md h-[577px] w-full max-w-[343px] mx-auto">
                <div className='rounded-md'>
                  <Image
                    src="/Hero.png"
                    alt="NextChat Interface"
                    className="absolute inset-0 w-full h-full object-contain rounded-md"
                    layout='fill'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='p-2 py-4'>
          <BentoGridDemo />
        </div>
        <div className='max-w-6xl mx-auto p-2 sm:p-4 flex sm:text-start text-center gap-2 sm:flex-row flex-col justify-between items-center'>
          <div className='text-accent-foreground'>
            <h3 className='text-2xl'>
              Pricing
            </h3>
            Unlock <span className=''>full features</span>, select your Plan today!
          </div>
          <PricingCard />
        </div>
      </div>
    </>
  )
}

export default LandingPage