import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export const PERSONAL_DATA = {
    name: "Sravan Krishna C M",
    role: "Cybersecurity · DevOps · Flutter",
    bio: "Computer Science student who builds secure systems and breaks insecure ones. Most days that means Python automation, Flutter apps, and poking at web targets with Burp.",
    email: "sravan@p1ng.me",
    socials: [
        { name: "GitHub", icon: Github, href: "https://github.com/sravan1946" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/sravan-krishna-c-m" },
        { name: "Instagram", icon: Instagram, href: "https://instagram.com/sravan_krishna_c_m" },
        { name: "Email", icon: Mail, href: "mailto:sravan@p1ng.me" },
    ],
};

// Hero system panel, neofetch-style. All true.
export const NEOFETCH = [
    { key: "os", value: "arch linux", accent: true },
    { key: "wm", value: "hyprland" },
    { key: "langs", value: "python · dart · bash" },
    { key: "focus", value: "cybersecurity / appsec" },
    { key: "uptime", value: "3rd year · b.tech cse" },
    { key: "status", value: "open to collaborate", accent: true },
];

export const FULL_TECH_STACK = [
    // Languages & Frameworks
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB", category: "Language" },
    { name: "Dart", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg", color: "#0175C2", category: "Language" },
    { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", color: "#02569B", category: "Mobile" },
    { name: "Bash", url: "https://cdn.simpleicons.org/gnubash/ffffff", color: "#4EAA25", category: "Scripting" },

    // Tools & Cloud
    { name: "GitHub", url: "https://cdn.simpleicons.org/github/ffffff", color: "#181717", category: "Version Control" },
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", color: "#2496ED", category: "DevOps" },
    { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg", color: "#FFCA28", category: "Cloud" },
    { name: "Cloudflare", url: "https://cdn.simpleicons.org/cloudflare/F38020", color: "#F38020", category: "Cloud" },

    // OS & Security
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", color: "#FCC624", category: "OS" },
    { name: "Arch Linux", url: "https://cdn.simpleicons.org/archlinux/1793D1", color: "#1793D1", category: "OS" },
    { name: "Hyprland", url: "https://cdn.simpleicons.org/hyprland/00ADD8", color: "#00ADD8", category: "Linux Customization" },
    { name: "Burp Suite", url: "https://cdn.simpleicons.org/burpsuite/FF6633", color: "#FF6633", category: "Security" },
];

export const PROJECTS = [
    {
        title: "HelloCare",
        category: "Health Tech",
        description: "Healthcare management app built with Flutter. Patients store, manage, and share medical records securely, with AI-powered insights on top.",
        tech: ["Flutter", "Bloc", "Clean Arch", "Dio", "Firebase"],
        url: "https://github.com/Unemployed-Nerds/HelloCare",
        demoUrl: "https://github.com/Unemployed-Nerds/HelloCare/releases/latest",
        year: "2024",
        status: "maintained" as const,
    },
    {
        title: "LpuLive",
        category: "Communication",
        description: "Unofficial open-source chat client for university students, built for transparent communication where the official app fell short.",
        tech: ["Flutter", "Dart", "Provider", "Hive", "REST API"],
        url: "https://github.com/sravan1946/LpuLive-unofficial",
        demoUrl: "https://github.com/sravan1946/LpuLive-unofficial/releases/latest",
        year: "2023",
        status: "maintained" as const,
    },
    {
        title: "Sravan Cogs",
        category: "Discord Bot",
        description: "Custom cogs for Red-DiscordBot: moderation tooling, music, economy, and server management used across community servers.",
        tech: ["Python", "Discord.py", "Red-Bot", "AsyncIO"],
        url: "https://github.com/sravan1946/sravan-cogs",
        year: "2023",
        status: "archived" as const,
    },
    {
        title: "Portfolio",
        category: "Web",
        description: "This site. A terminal-native portfolio with a working in-page shell and command palette. View source to see how it ticks.",
        tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
        url: "https://github.com/sravan1946/portfolio",
        demoUrl: "https://p1ng.me",
        year: "2024",
        status: "maintained" as const,
    },
];

export const EDUCATION = [
    {
        institution: "Lovely Professional University",
        credential: "B.Tech, Computer Science and Engineering",
        period: "2023 – 2027",
        detail: "Focus on system architecture and cybersecurity.",
        current: true,
    },
    {
        institution: "Gurukulam Public School",
        credential: "Higher Secondary, Computer Science",
        period: "2021 – 2023",
        detail: "Specialized in computer science.",
        current: false,
    },
];
