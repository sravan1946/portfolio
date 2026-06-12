export const PERSONAL_DATA = {
    email: "sravan@p1ng.me",
    socials: [
        { name: "GitHub", href: "https://github.com/sravan1946" },
        { name: "LinkedIn", href: "https://linkedin.com/in/sravan-krishna-c-m" },
        { name: "Instagram", href: "https://instagram.com/sravan_krishna_c_m" },
        { name: "Email", href: "mailto:sravan@p1ng.me" },
    ],
};

export const FULL_TECH_STACK = [
    // Languages & Frameworks
    { name: "Python", category: "Language" },
    { name: "Dart", category: "Language" },
    { name: "Flutter", category: "Mobile" },
    { name: "Bash", category: "Scripting" },

    // Tools & Cloud
    { name: "GitHub", category: "Version Control" },
    { name: "Docker", category: "DevOps" },
    { name: "Firebase", category: "Cloud" },
    { name: "Cloudflare", category: "Cloud" },

    // OS & Security
    { name: "Linux", category: "OS" },
    { name: "Arch Linux", category: "OS" },
    { name: "Hyprland", category: "Linux Customization" },
    { name: "Burp Suite", category: "Security" },
];

export const PROJECTS = [
    {
        title: "HelloCare",
        category: "Health Tech",
        tagline: "flutter healthcare app. secure medical records, shared on the patient's terms, ai insights on top.",
        tech: ["Flutter", "Bloc", "Clean Arch", "Dio", "Firebase"],
        url: "https://github.com/Unemployed-Nerds/HelloCare",
        demoUrl: "https://github.com/Unemployed-Nerds/HelloCare/releases/latest",
        year: "2024",
    },
    {
        title: "LpuLive",
        category: "Communication",
        tagline: "unofficial open-source chat client for university students. built where the official app fell short.",
        tech: ["Flutter", "Dart", "Provider", "Hive", "REST API"],
        url: "https://github.com/sravan1946/LpuLive-unofficial",
        demoUrl: "https://github.com/sravan1946/LpuLive-unofficial/releases/latest",
        year: "2023",
    },
    {
        title: "Sravan Cogs",
        category: "Discord Bot",
        tagline: "custom cogs for red-discordbot. moderation, music, economy. archived, still running somewhere.",
        tech: ["Python", "Discord.py", "Red-Bot", "AsyncIO"],
        url: "https://github.com/sravan1946/sravan-cogs",
        year: "2023",
    },
    {
        title: "Portfolio",
        category: "Web",
        tagline: "this site. a riso print pretending to be a website. view source to see how it ticks.",
        tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
        url: "https://github.com/sravan1946/portfolio",
        demoUrl: "https://p1ng.me",
        year: "2024",
    },
];

// Work + education, newest first.
export const LOG = [
    {
        institution: "ShopDeck",
        credential: "DevOps Intern",
        period: "2026 –",
        detail: "Infrastructure, pipelines, and keeping production boring.",
        kind: "work" as const,
        current: true,
    },
    {
        institution: "Lovely Professional University",
        credential: "B.Tech, Computer Science and Engineering",
        period: "2023 – 2027",
        detail: "Focus on system architecture and cybersecurity.",
        kind: "education" as const,
        current: true,
    },
    {
        institution: "Gurukulam Public School",
        credential: "Higher Secondary, Computer Science",
        period: "2021 – 2023",
        detail: "Specialized in computer science.",
        kind: "education" as const,
        current: false,
    },
];

export const TECH_FACTS: Record<string, string[]> = {
    Python: [
        "Exponentially faster than writing C++",
        "Has a type system if you squint hard enough",
        "Picked by 54% of hackers... allegedly",
    ],
    Dart: [
        "The lang that time forgot (until Flutter)",
        "Guaranteed to make JS devs say 'huh?'",
        "Strongly typed but somehow feels playful",
    ],
    Flutter: [
        "Write once, debug everywhere (love)",
        "Hot reload: because waiting is for losers",
        "The only framework that judges you back",
    ],
    Bash: [
        "Dark magic for the command line",
        "pipelines > your entire career",
        "rm -rf /: the final boss of shell scripting",
    ],
    GitHub: [
        "Where code goes to become someone else's problem",
        "Commit early, commit often, commit regret",
        "Git blame: the sport of finding who broke prod",
    ],
    Docker: [
        "It works on my machine™️ certified",
        "Containerization: because bare metal is scary",
        "Dockerfile > your documentation",
    ],
    Firebase: [
        "Google's 'we'll monetize this later' platform",
        "Free tier: 0 to infinite in 3 months",
        "Serverless means no servers = no problems (right?)",
    ],
    Cloudflare: [
        "The only CDN that doesn't cost your firstborn",
        "DDoS protection: thanks, Minecraft kids",
        "Workers: because servers are so 2019",
    ],
    Linux: [
        "BTW I use Arch (mandatory disclosure)",
        "Gentoo users are in a cult",
        "sudo: we trust you, probably",
    ],
    "Arch Linux": [
        "BTW I use Arch",
        "You've manifested this moment",
        "RTFM or GTFO, choose wisely",
    ],
    Hyprland: [
        "tiling window manager > your mental health",
        "配置文件: 1, Sanity: 0",
        "Xorg? Never heard of her",
    ],
    "Burp Suite": [
        "OWASP Top 10 in a GUI",
        "Proxy: because privacy is a suggestion",
        "The only tool where scrolling is productive",
    ],
};
