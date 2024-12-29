import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Settings = () => {
    return (
        <div className='flex h-[95dvh] w-dvw overflow-y-auto justify-center items-center'>
        <UserProfile />
        </div>
    )
}

export default Settings