import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export const PERSONAL_DATA = {
    name: "Sravan Krishna C M",
    role: "System Architect & Security Engineer",
    bio: "I am a Computer Science student with a deep focus on Cybersecurity, DevOps, and Mobile Development. I engineer secure, resilient systems, build cross-platform applications with Flutter, and automate infrastructure. My work bridges the gap between robust software engineering, seamless operations, and proactive security.",
    email: "sravan@p1ng.me",
    socials: [
        { name: "GitHub", icon: Github, href: "https://github.com/sravan1946" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/sravan-krishna-c-m" },
        { name: "Instagram", icon: Instagram, href: "https://instagram.com/sravan_krishna_c_m" },
        { name: "Email", icon: Mail, href: "mailto:sravan@p1ng.me" },
    ],
};

export const FULL_TECH_STACK = [
    // The Creator (Languages & Frameworks)
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB", category: "Language" },
    { name: "Dart", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg", color: "#0175C2", category: "Language" },
    { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", color: "#02569B", category: "Mobile" },
    { name: "Bash", url: "https://cdn.simpleicons.org/gnubash/ffffff", color: "#4EAA25", category: "Scripting" },

    // The Builder (Tools & Cloud)
    { name: "GitHub", url: "https://cdn.simpleicons.org/github/ffffff", color: "#181717", category: "Version Control" },
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", color: "#2496ED", category: "DevOps" },
    { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg", color: "#FFCA28", category: "Cloud" },
    { name: "Cloudflare", url: "https://cdn.simpleicons.org/cloudflare/F38020", color: "#F38020", category: "Cloud" },

    // The Hacker (OS & Security)
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", color: "#FCC624", category: "OS" },
    { name: "Arch Linux", url: "https://cdn.simpleicons.org/archlinux/1793D1", color: "#1793D1", category: "OS" },
    { name: "Hyprland", url: "https://cdn.simpleicons.org/hyprland/00ADD8", color: "#00ADD8", category: "Linux Customization" },
    { name: "Burp Suite", url: "https://cdn.simpleicons.org/burpsuite/FF6633", color: "#FF6633", category: "Security" },
];

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
