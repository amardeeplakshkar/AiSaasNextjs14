import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import Loader from "@/components/Loader";
import Provider from "./provider";

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
      <html lang="en" suppressHydrationWarning>
        <script
          type="text/javascript"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script>
        <body
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
