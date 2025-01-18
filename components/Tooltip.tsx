import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

interface TooltipBoxProps{
    children:React.ReactNode,
    content:string,
 }

 const TooltipBox: React.FC<TooltipBoxProps> = ({ children, content }) => {
  return (
    <TooltipProvider>
    <Tooltip delayDuration={250}>
      <TooltipTrigger className='p-0 m-0'>
        {children}
      </TooltipTrigger>
      <TooltipContent className='bg-primary/5 text-primary' side='bottom'>
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}

export default TooltipBox
