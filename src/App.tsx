import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { use3DCapable } from "@/world/useCapabilities";

const SmoothScrolling = lazy(() => import("@/components/SmoothScrolling").then(m => ({ default: m.SmoothScrolling })));
const Terminal = lazy(() => import("@/components/Terminal").then(m => ({ default: m.Terminal })));
const CommandMenu = lazy(() => import("@/components/CommandMenu").then(m => ({ default: m.CommandMenu })));
const World3D = lazy(() => import("@/world/World3D"));

function LoadingFallback() {
  return <div className="fixed inset-0 bg-[var(--bg)] z-[var(--z-toast)] flex items-center justify-center">
    <div className="text-[var(--accent)] font-[family-name:var(--font-mono)] text-sm animate-pulse">booting...</div>
  </div>;
}

export default function App() {
  const capableByGate = use3DCapable();
  const [worldDead, setWorldDead] = useState(false);
  const capable = capableByGate && !worldDead;
  const [mountWorld, setMountWorld] = useState(false);

  // GPU context loss is unrecoverable enough: drop to the flat site silently.
  useEffect(() => {
    const onDead = () => setWorldDead(true);
    window.addEventListener("world:dead", onDead);
    return () => window.removeEventListener("world:dead", onDead);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = capable ? "3d" : "flat";
    if (!capable) {
      setMountWorld(false);
      return;
    }
    // The flat site is the LCP content; the world chunk loads on idle.
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let id: number;
    if (win.requestIdleCallback) {
      id = win.requestIdleCallback(() => setMountWorld(true));
      return () => win.cancelIdleCallback?.(id);
    }
    id = window.setTimeout(() => setMountWorld(true), 250);
    return () => window.clearTimeout(id);
  }, [capable]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <SmoothScrolling>
        <a href="#main-content" className="skip-nav">Skip to content</a>
        {capable && mountWorld && (
          <Suspense fallback={null}>
            <World3D />
          </Suspense>
        )}
        <main id="main-content" className="min-h-screen relative z-10">
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
