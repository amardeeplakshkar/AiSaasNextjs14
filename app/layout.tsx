import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import Loader from "@/components/Loader";
import Provider from "./provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "DeepAI",
  description: "DeepAI provides a suite of AI tools, including image generation, AI conversation, code generation, image transformation, background removal, image ratio cropping, and more to empower users with cutting-edge AI technology.",
  keywords: "AI tools, image generation, AI conversation, AI code generation, image transform, background remover, AI image crop, AI technology, Deepai, Deep AI, Amardeep Lakshkar, Amardeep Devs, Amardeep",
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
      <html lang="en" suppressHydrationWarning>
      <Script
  src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.js"
  integrity="sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh"
  crossOrigin="anonymous"
  strategy="lazyOnload" // Load the script lazily after the page is rendered
/>
        <script
          type="text/javascript"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script>
            <head>
          <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
              integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib"
              crossOrigin="anonymous"
            />
            </head>
        <body
        suppressHydrationWarning
          className={`antialiased relative mt-[3rem]`}
        >
            <Provider>
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
            </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
