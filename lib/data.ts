import { Github, Instagram, Linkedin, Layout, Globe, Zap, Layers, Server, Database, Smartphone, Cpu } from "lucide-react";

export const PERSONAL_DATA = {
    name: "Sravan Krishna C M",
    role: "B.Tech CSE & Cybersecurity",
    bio: "I am a Computer Science student with a deep focus on Cybersecurity, DevOps, and Mobile Development. I engineer secure, resilient systems, build cross-platform applications with Flutter, and automate infrastructure. My work bridges the gap between robust software engineering, seamless operations, and proactive security.",
    email: "sravan.krishna@example.com", // Placeholder
    socials: [
        { name: "GitHub", icon: Github, href: "https://github.com/sravan1946" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/sravan-krishna-c-m" },
        { name: "Instagram", icon: Instagram, href: "https://instagram.com/sravan_krishna_c_m" },
    ],
};

export const PROJECTS = [
    {
        title: "Neon Nexus",
        category: "DeFi Dashboard",
        description: "A high-frequency trading platform with real-time data visualization and sub-millisecond updates.",
        tech: ["Next.js", "WebSockets", "D3.js"],
        size: "col-span-1 md:col-span-2",
    },
    {
        title: "Vapor Chat",
        category: "Messaging App",
        description: "E2E encrypted chat application with vaporwave aesthetics.",
        tech: ["React Native", "Signal Protocol"],
        size: "col-span-1",
    },
    {
        title: "Glass OS",
        category: "Web Operating System",
        description: "A fully functional desktop environment running in the browser using WebAssembly.",
        tech: ["Rust", "WASM", "WebGL"],
        size: "col-span-1",
    },
    {
        title: "Aether Lens",
        category: "AR Commerce",
        description: "Augmented reality product previews for e-commerce stores.",
        tech: ["Three.js", "WebXR", "8th Wall"],
        size: "col-span-1 md:col-span-2",
    },
];

export const TECH_STACK = [
    { name: "React", icon: Layout },
    { name: "Next.js", icon: Globe },
    { name: "TypeScript", icon: Zap },
    { name: "Python", icon: Zap }, // Using Zap as placeholder if custom icon not passed, but we use Si icons in components mostly
    { name: "Flutter", icon: Smartphone },
    { name: "DevOps", icon: Server },
    { name: "Cybersecurity", icon: Layers },
    { name: "WebAssembly", icon: Cpu },
];

export const EXPERIENCES = [
    {
        company: "Vapor Inc.",
        role: "Senior Frontend Engineer",
        period: "2023 - Present",
        description: "Led the reconstruction of the core trading platform using Next.js 14 and WebSockets. Improved perceived performance by 40% using optimistic UI updates.",
    },
    {
        company: "Nebula Labs",
        role: "Creative Developer",
        period: "2021 - 2023",
        description: "Developed immersive 3D web experiences for Fortune 500 clients using Three.js and GSM. Awarded Awwwards implementations.",
    },
    {
        company: "Freelance",
        role: "Full Stack Developer",
        period: "2019 - 2021",
        description: "Delivered 15+ custom web applications. Specialized in high-conversion landing pages with complex animations.",
    },
];
