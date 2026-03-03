import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FloatingNav from "@/components/ui/FloatingNav";
import { Analytics } from "@vercel/analytics/next";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fazzadwr.my.id"),
  title: {
    default: "Fazzadwr | UI/UX Designer Portfolio",
    template: "%s | Fazzadwr",
  },
  description:
    "Explore my portfolio where I bridge complex design systems with pixel-perfect React and Next.js development.",
  verification: {
    google: "eZzimI813TOueO-GV51GrNnvYMY3mocqUxeEIwmNiMk",
  },
  openGraph: {
    title: "Fazzadwr | UI/UX Designer Portfolio",
    description:
      "Explore my portfolio where I bridge complex design systems with pixel-perfect React and Next.js development.",
    url: "https://fazzadwr.my.id",
    siteName: "Fazzadwr",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Fazzadwr Portfolio Thumbnail",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fazzadwr | UI/UX Designer Portfolio",
    description:
      "Explore my portfolio where I bridge complex design systems with pixel-perfect React and Next.js development.",
    images: ["/thumbnail.png"],
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
        <Analytics />
      </body>
    </html>
  );
}
