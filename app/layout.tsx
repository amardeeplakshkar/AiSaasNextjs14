import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import Loader from "@/components/Loader";
// import { dark } from '@clerk/themes'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edith AI",
  description: "Edith AI provides a suite of AI tools, including image generation, AI conversation, code generation, image transformation, background removal, image ratio cropping, and more to empower users with cutting-edge AI technology.",
  keywords: "AI tools, image generation, AI conversation, AI code generation, image transform, background remover, AI image crop, AI technology, edithai, Edith AI, Amardeep Lakshkar, Amardeep Devs, Amardeep",
  robots: "index, follow",
  authors: { name: "Amardeep Lakshkar", url: "amardeep-portfolio.vercel.app" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [],
      }}
    >
      <html lang="en">
        <head>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative mt-[3rem]`}
        >
          <ClerkLoading>
            <Loader />
          </ClerkLoading>
          <ClerkLoaded>
            <div className="fixed top-0 z-50 w-full">
              <Navbar />
            </div>
            {children}
          </ClerkLoaded>
          <Toaster
            containerClassName="text-xs"
            position="top-center"
            reverseOrder={false}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
