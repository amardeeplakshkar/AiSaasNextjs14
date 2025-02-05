import LandingPage from '@/components/Landing'
import SplineComponent from '@/components/Spline'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-[#194439] pt-[3rem] -mt-[3rem]'>
      <SplineComponent />
      <LandingPage/>
    </div>
  )
}

export default Page