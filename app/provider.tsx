import { ThemeProvider } from "@/components/ui/ThemeProvider";

export default function Provider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
{children}
</ThemeProvider>
)}
