import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const SmoothScrolling = lazy(() => import("@/components/SmoothScrolling").then(m => ({ default: m.SmoothScrolling })));
const MatrixBackground = lazy(() => import("@/components/MatrixBackground").then(m => ({ default: m.MatrixBackground })));
const GlobalSpotlight = lazy(() => import("@/components/GlobalSpotlight").then(m => ({ default: m.GlobalSpotlight })));
const CyberCursor = lazy(() => import("@/components/CyberCursor").then(m => ({ default: m.CyberCursor })));
const CyberContextMenu = lazy(() => import("@/components/CyberContextMenu").then(m => ({ default: m.CyberContextMenu })));
const Terminal = lazy(() => import("@/components/Terminal").then(m => ({ default: m.Terminal })));
const CommandMenu = lazy(() => import("@/components/CommandMenu").then(m => ({ default: m.CommandMenu })));

function LoadingFallback() {
  return <div className="fixed inset-0 bg-[#030712] z-[9999] flex items-center justify-center">
    <div className="text-[var(--green-400)] font-mono animate-pulse">Initializing...</div>
  </div>;
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SmoothScrolling>
        <a href="#main-content" className="skip-nav">Skip to content</a>
        <MatrixBackground />
        <GlobalSpotlight />
        <CyberCursor />
        <CyberContextMenu />
        <div className="noise-overlay" />
        <div className="scanline" />
        <main id="main-content" className="min-h-screen relative">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <TechStack />
          <Experience />
          <CTA />
        </main>
        <Footer />
        <Terminal />
        <CommandMenu />
      </SmoothScrolling>
    </Suspense>
  );
}