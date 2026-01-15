import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { CTA } from "@/components/CTA";


export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Experience />
      <CTA />
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} Designed & Built with ❤️ and Next.js</p>
      </footer>
    </main>
  );
}
