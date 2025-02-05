import { UserButton, UserProfile } from '@clerk/nextjs'
import React from 'react'

const Settings = () => {
    return (
        <div className='flex h-[95dvh] w-dvw overflow-y-auto justify-center items-center'>
            <UserButton />
            <UserProfile />
        </div>
    )
}

export default Settings