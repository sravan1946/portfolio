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
        title: "HelloCare",
        category: "Health Tech",
        description: "Say hello to your care. A comprehensive health application built with Flutter.",
        tech: ["Flutter", "Bloc", "Clean Arch", "Dio", "Dartz", "Firebase"],
        size: "col-span-1 md:col-span-2",
        url: "https://github.com/Unemployed-Nerds/HelloCare",
        demoUrl: "https://github.com/Unemployed-Nerds/HelloCare/releases/latest",
        year: "2024"
    },
    {
        title: "Sravan Cogs",
        category: "Discord Bot Extensions",
        description: "Custom cogs for Red-DiscordBot, enhancing server functionality with Python.",
        tech: ["Python", "Discord.py", "Red-Bot", "AsyncIO", "APIs"],
        size: "col-span-1",
        url: "https://github.com/sravan1946/sravan-cogs",
        year: "2023"
    },
    {
        title: "LpuLive",
        category: "University Utility",
        description: "Unofficial mobile application for university management and student utilities.",
        tech: ["Flutter", "Dart", "Provider", "Hive", "REST API"],
        size: "col-span-1",
        url: "https://github.com/sravan1946/LpuLive-unofficial",
        demoUrl: "https://github.com/sravan1946/LpuLive-unofficial/releases/latest",
        year: "2023"
    },
    {
        title: "Portfolio",
        category: "Web Experience",
        description: "The interactive 3D portfolio website you are currently viewing.",
        tech: ["Next.js 14", "TypeScript", "Three.js", "Tailwind", "Framer Motion"],
        size: "col-span-1 md:col-span-2",
        url: "https://github.com/sravan1946/portfolio",
        demoUrl: "https://p1ng.me",
        year: "2024"
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
