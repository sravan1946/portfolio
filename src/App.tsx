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

function LoadingFallback() {
  return <div className="fixed inset-0 bg-[var(--blue)] z-50 flex items-center justify-center">
    <div className="text-[var(--paper)] font-[family-name:var(--font-mono)] text-sm">loading…</div>
  </div>;
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SmoothScrolling>
        <a href="#main-content" className="skip-nav">Skip to content</a>
        <main id="main-content" className="relative">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <TechStack />
          <Experience />
          <CTA />
        </main>
        <Footer />
      </SmoothScrolling>
    </Suspense>
  );
}
