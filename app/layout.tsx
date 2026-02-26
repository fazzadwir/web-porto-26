import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingNav from "@/components/ui/FloatingNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fazzadwr.my.id"),
  title: {
    default: "Fazzadwr | Web Developer Portfolio",
    template: "%s | Fazzadwr",
  },
  description:
    "Personal web developer portfolio of Fazzadwr, showcasing modern, responsive, and high-performance web applications built with Next.js, React, and TypeScript.",
  verification: {
    google: "eZzimI813TOueO-GV51GrNnvYMY3mocqUxeEIwmNiMk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} antialiased bg-zinc-800 text-white`}
        suppressHydrationWarning
      >
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
