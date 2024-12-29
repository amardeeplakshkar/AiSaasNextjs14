import React from 'react'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='h-[92dvh] w-dvw flex justify-center items-center'>{children}</div>
    )
}
