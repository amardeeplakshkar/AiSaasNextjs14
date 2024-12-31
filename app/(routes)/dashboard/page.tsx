// /* eslint-disable react-hooks/rules-of-hooks */
// "use client";

// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { ArrowRight } from "lucide-react";
// import { TOOLS } from "@/constants";
// import { useRouter } from "next/navigation"
// function dashboardPage() {
//   const router = useRouter();
//   return (
//     <div className="pt-4 h-[92.5dvh]  bg-cover bg-center">
//       <div className="space-y-4">
//         <h2 className="text-2xl md:text-4xl font-bold text-center">
//           Explore the power of AI
//         </h2>
//         <p className="text-muted-foreground -mt-2 pb-2 font-light text-sm md:text-lg text-center">
//           Chat with the Smartest AI - Experience the power of AI
//         </p>
//       </div>
//       <div className="my-2 px-4 md:px-20 gap-2 lg:px-32  grid grid-cols-2">
//         {TOOLS.map((tool) => (
//           <Card
//             onClick={() => router.push(tool.href)}
//             key={tool.href}
//             className="p-4 h-full border-black/5 flex  items-center justify-between hover:shadow-md transition cursor-pointer"
//           >
//             <div className="flex flex-col w-full items-start gap-x-4">
//               <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
//                 <tool.icon className={cn("w-8 h-8", tool.color)} />
//               </div>
//               <div className="pt-4 font-semibold w-full flex justify-between items-center">
//                 <h2 className="line-clamp-1 text-ellipsis text-xs">
//                   {tool.label}
//                 </h2>
//                 <div className="">
//                 <ArrowRight />
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default dashboardPage;

"use client"
import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { UserAvatar } from '@/components/Avatar';
import PopularPrompts from '@/components/ui/PopularPrompts';
import FeatureCard from '@/components/ui/FeatureCard';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { TOOLS } from '@/constants';
import { ProModal } from '@/components/ProModal';

const ChatInterface = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useUser();

  return (
    <div className="flex -mt-[3rem] pt-[4rem] flex-col min-h-screen p-6 bg-gradient-to-b to-chat-dark from-[#235347]">
      <div className='text-white pt-2 flex justify-between items-center'>
        <div className='flex gap-2 justify-center items-center'>
          <UserAvatar />
          <p>
            {user?.fullName}
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant={"premium"} className='bg-chat-card cursor-pointer p-1 px-3 rounded-full  flex justify-center items-center gap-1'> <Crown className='' /> Go Pro</Button>
      </div>
      <div className="sm:mt-12 mt-2">
        <h1 className="text-chat-title text-white font-light sm:mb-8 mb-2">
          Hi, what can EDITH<br />do to help you?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:mb-12 mb-2">
          {TOOLS.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.label}
              iconColor={feature.color}
              href={feature.href}
            />
          ))}
        </div>

        <PopularPrompts />
      </div>
      <ProModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
      />
    </div>
  );
};

export default ChatInterface;