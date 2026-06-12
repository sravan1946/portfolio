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
const Terminal = lazy(() => import("@/components/Terminal").then(m => ({ default: m.Terminal })));
const CommandMenu = lazy(() => import("@/components/CommandMenu").then(m => ({ default: m.CommandMenu })));

function LoadingFallback() {
  return <div className="fixed inset-0 bg-[var(--bg)] z-[var(--z-toast)] flex items-center justify-center">
    <div className="text-[var(--accent)] font-[family-name:var(--font-mono)] text-sm animate-pulse">booting...</div>
  </div>;
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SmoothScrolling>
        <a href="#main-content" className="skip-nav">Skip to content</a>
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
