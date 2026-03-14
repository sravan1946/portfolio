import { CommandMenu } from "@/components/CommandMenu";
import { CyberCursor } from "@/components/CyberCursor";
import { MatrixBackground } from "@/components/MatrixBackground";
import { Terminal } from "@/components/Terminal";
import { CyberContextMenu } from "@/components/CyberContextMenu";
import { GlobalSpotlight } from "@/components/GlobalSpotlight";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { CTA } from "@/components/CTA";

export default function App() {
  return (
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
      <footer className="py-8 text-center text-[var(--slate-600)] text-sm" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
        <p>© {new Date().getFullYear()} Designed & Built with ❤️</p>
      </footer>
      <Terminal />
      <CommandMenu />
    </SmoothScrolling>
  );
}