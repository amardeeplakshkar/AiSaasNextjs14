import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div style={{ backgroundImage: "url('https://kit.sociolib.com/nextchat/wp-content/uploads/sites/11/2024/09/Line-grid.png')" }} className='text-secondary pt-[3.5rem] -mt-[3rem] bg-cover bg-center h-dvh w-dvw bg-[#1d2a28]'>
      <div className='flex items-center justify-center max-md:flex-col'>
      <div className='  h-[50dvh] p-4 grid gap-3'>
        <h2 className=" text-3xl font-semibold font-sans">
          Connect, chat, and explore with <span className='bg-white text-[#1d2a28] px-1 rounded-md'>EDITH</span>
        </h2>
        <p className='text-sm'>
          Experience a new way to chat — where conversations are smarter, faster, and more personalized than ever before.
        </p>
        <Button className='w-min' variant={"premium"}>Get Started</Button>
      </div>
      <div className='p-2'>
        <img className='rounded-lg' src="https://kit.sociolib.com/nextchat/wp-content/uploads/sites/11/2024/09/11-585x1024.webp" alt="" />
      </div>
      </div>
    </div>
  )
}

export default page