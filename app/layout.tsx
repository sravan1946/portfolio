import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE || "Hyper-Modern Portfolio",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "A high-performance immersive portfolio.",
};

import { CommandMenu } from "@/components/CommandMenu";
import { CyberCursor } from "@/components/CyberCursor";
import { MatrixBackground } from "@/components/MatrixBackground";
import { Terminal } from "@/components/Terminal";
import { CyberContextMenu } from "@/components/CyberContextMenu";
import { GlobalSpotlight } from "@/components/GlobalSpotlight";
import { SmoothScrolling } from "@/components/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark cursor-none">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        <SmoothScrolling>
          <MatrixBackground />
          <GlobalSpotlight />
          <CyberCursor />
          <CyberContextMenu />
          <div className="noise-overlay" />
          <div className="scanline" />
          {children}
          <Terminal />
          <CommandMenu />
        </SmoothScrolling>
      </body>
    </html>
  );
}
