"use client"
import React, { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';
import { UserAvatar } from '@/components/Avatar';
import PopularPrompts from '@/components/ui/PopularPrompts';
import FeatureCard from '@/components/ui/FeatureCard';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { TOOLS } from '@/constants';
import { ProModal } from '@/components/ProModal';
import BentoGridDemo from '@/components/BentoGrid';
import PricingCard from '@/components/PricingCard';

const ChatInterface = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const primaryEmail = user?.emailAddresses?.[0]?.emailAddress;

  useEffect(() => {
    const createUser = async () => {
      if (user?.id && user?.username && primaryEmail) {
        try {
          const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id, username: user.username, email: primaryEmail }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log('User created successfully:', data);
          } else {
            console.error('Error creating user:', data.error);
          }
        } catch (error) {
          console.error('Error during API call:', error);
        }
      }
    };

    createUser();
  }, [user?.id, user?.username, primaryEmail]);


  return (
    <div className='bg-chat-dark pb-4 text-white'>
      <div className="flex -mt-[3rem] pt-[4rem] flex-col min-h-screen p-6 bg-gradient-to-b to-chat-dark from-[#235347]">
        <div className='text-white pt-2 flex justify-between items-center'>
          <div className='flex gap-2 justify-center items-center'>
            <UserAvatar />
            <p>
              {user?.fullName}
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} variant={"premium"} className='bg-chat-card cursor-pointer p-1 px-3 rounded-full flex justify-center items-center gap-1'> <Crown className='' /> Go Pro</Button>
        </div>
        <div className="sm:mt-12 mt-2">
          <h1 className="text-chat-title text-white font-light sm:mb-8 mb-2">
            Hi, what can DeepAI<br />do to help you?
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
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <div className='p-2 py-4'>
        <BentoGridDemo />
      </div>
      <div className='max-w-6xl mx-auto p-2 sm:p-4 flex sm:text-start text-center gap-2 sm:flex-row flex-col justify-between items-center'>
        <div>
          <h3 className='text-2xl'>
          Pricing
          </h3>
          Unlock <span className=''>full features</span>, select your Plan today!
        </div>
        <PricingCard />
      </div>
    </div>
  );
};

export default ChatInterface;
