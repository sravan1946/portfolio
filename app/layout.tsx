import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sravan's Portfolio",
  description: "Sravan Krishna — Computer Science student & cybersecurity engineer. Explore projects in Flutter, Python, DevOps, and offensive security.",
  icons: {
    icon: "/icon.png",
  },
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
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        <SmoothScrolling>
          <a href="#main-content" className="skip-nav">Skip to content</a>
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
