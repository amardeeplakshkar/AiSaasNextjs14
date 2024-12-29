import { LoaderIcon } from 'lucide-react'
import React from 'react'

const Loader = () => {
    return (
        <div className='h-dvh w-dvw flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-2'>
            <LoaderIcon size={'2rem'} className='animate-spin'/>
            </div>
        </div>
    )
}

export default Loader