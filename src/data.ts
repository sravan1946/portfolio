// Everything the page says. Facts come from the CV, the GitHub repos and the owner; nothing invented.

export const site = {
  name: 'Sravan Krishna C M',
  url: 'https://p1ng.me',
  title: 'Sravan Krishna | Builds and breaks systems',
  description:
    'Sravan Krishna builds secure systems and breaks insecure ones. DevOps intern at ShopDeck, captain of the CTF team Unemployed Nerds, open source since 2019.',
  email: 'sravan@p1ng.me',
  cv: '/cv.pdf',
  place: 'Bangalore, India',
  socials: [
    { label: 'GitHub', href: 'https://github.com/sravan1946' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/sravan-krishna' },
    { label: 'Instagram', href: 'https://instagram.com/sravan_krishna_c_m' },
  ],
};

export const projects = [
  {
    title: 'claude-island',
    meta: 'Developer tools, 2026',
    line: 'A Hyprland bar where every Claude Code session gets its own lane. Lane height says idle, working or blocked on you, and permission prompts get answered with a click.',
    stack: 'QML, Quickshell, Hyprland IPC',
    href: 'https://github.com/sravan1946/claude-island',
  },
  {
    title: 'vibeos',
    meta: 'Operating systems, 2025',
    line: 'A 32-bit x86 OS written from scratch: its own bootloader, kernel, compositing window manager, ext2, TCP/IP with TLS, libc, a web browser, and Doom.',
    stack: 'C, x86 assembly, QEMU',
    href: 'https://github.com/sravan1946/VibeOS',
  },
  {
    title: 'quickshell-dots',
    meta: 'Desktop, 2026',
    line: 'My whole Hyprland shell in one repo: an island bar whose cards grow out of it, notifications, OSD, polkit agent, power menu, and a beat wave that runs around the focused window.',
    stack: 'QML, GLSL, C++, cava',
    href: 'https://github.com/sravan1946/quickshell-dots',
  },
  {
    title: 'hellocare',
    meta: 'Health tech, 2025',
    line: 'A Flutter healthcare app. Medical records in one place, shared with a doctor through a QR code that expires when the patient says so, with an AI assistant you can talk to.',
    stack: 'Flutter, Firebase, Hive, Gemini',
    href: 'https://github.com/Unemployed-Nerds/HelloCare',
  },
  {
    title: 'lpulive',
    meta: 'Communication, 2025',
    line: 'An unofficial open-source chat client for university students, built where the official app fell short. Public so anyone can check what it does with their login.',
    stack: 'Flutter, Dart, Hive, REST',
    href: 'https://github.com/sravan1946/LpuLive-unofficial',
  },
  {
    title: 'sravan-cogs',
    meta: 'Discord bots, since 2019',
    line: 'Ten-odd cogs for Red-DiscordBot: games, moderation, server management. Archived, still running somewhere.',
    stack: 'Python, discord.py, asyncio',
    href: 'https://github.com/sravan1946/sravan-cogs',
  },
  {
    title: 'networkswitch',
    meta: 'Android',
    line: 'An Android app, forked and redesigned.',
    stack: '',
    href: 'https://github.com/sravan1946/NetworkSwitch',
  },
];

export const facts = [
  { k: 'Based in', v: 'Bangalore, India' },
  { k: 'Day job', v: 'DevOps intern at ShopDeck' },
  { k: 'CTF', v: 'Captain of Unemployed Nerds, India #30 on CTFtime in 2025' },
  { k: 'Daily driver', v: 'Arch Linux with Hyprland' },
];

export const record = [
  {
    word: 'Doing',
    rows: [
      { what: 'DevOps intern, ShopDeck', when: '2026 to now' },
      { what: 'CTF team captain, Unemployed Nerds', when: '2025 to now' },
      { what: 'Open source, 70+ public repos', when: '2019 to now' },
    ],
  },
  {
    word: 'Studying',
    rows: [
      { what: 'B.Tech in Computer Science, minor in Cybersecurity, Lovely Professional University', when: '2023 to 2027' },
      { what: 'Higher secondary, Computer Science, Gurukulam Public School', when: '2021 to 2023' },
    ],
  },
];

// The bill of materials: what shows up in my day-to-day. Press a part, get a hot take (they cycle).
// Takes for python, bash, flutter, docker, github actions, arch, hyprland and burp are the owner's own, from the old site.
export const stack: { name: string; kind: string; takes: string[] }[] = [
  { name: 'python', kind: 'language', takes: ['Exponentially faster than writing C++.', 'Has a type system if you squint hard enough.', 'Picked by 54% of hackers… allegedly.'] },
  { name: 'bash', kind: 'scripting', takes: ['Dark magic for the command line.', 'Pipelines > your entire career.', 'rm -rf /: the final boss of shell scripting.'] },
  { name: 'flutter', kind: 'mobile', takes: ['Write once, debug everywhere.', 'Hot reload: because waiting is for losers.', 'The only framework that judges you back.'] },
  { name: 'qml', kind: 'desktop ui', takes: ['My whole desktop is a QML file.', 'Property bindings: spreadsheets for pixels.', 'Nobody writes QML on purpose. Except me.'] },
  { name: 'aws', kind: 'cloud', takes: ['Two hundred services, three of them make sense.', 'The bill is the real monitoring dashboard.', 'IAM: deny by default, confuse by design.'] },
  { name: 'gcp', kind: 'cloud', takes: ['The other cloud. Yes, both.', 'Same problems, different console.', 'gcloud config set project: the most typed line of my week.'] },
  { name: 'kubernetes', kind: 'orchestration', takes: ['YAML with a control loop.', 'CrashLoopBackOff is a lifestyle.', 'kubectl get pods, again, just to be sure.'] },
  { name: 'eks', kind: 'managed k8s', takes: ['Kubernetes, with an invoice.', 'Somebody else patches the control plane. Bless them.', 'Node groups: the pets in a cattle farm.'] },
  { name: 'helm', kind: 'packaging', takes: ['Templates for your templates.', 'values.yaml is where the truth hides.', '{{ indent 4 }}: the most important line in the chart.'] },
  { name: 'argo cd', kind: 'gitops', takes: ['Git says so, so it happens.', 'OutOfSync: the most honest status in the cluster.', 'Drift has nowhere to hide.'] },
  { name: 'jenkins', kind: 'ci/cd', takes: ['Older than half the stack, still shipping.', 'Groovy: the language you only learn by accident.', 'Plugins all the way down.'] },
  { name: 'github actions', kind: 'ci/cd', takes: ['Where code goes to become someone else’s problem.', 'Commit early, commit often, commit regret.', 'Push, wait, watch the dots turn green.'] },
  { name: 'docker', kind: 'containers', takes: ['It works on my machine™, certified.', 'Containers: because bare metal is scary.', 'Dockerfile > your documentation.'] },
  { name: 'nginx', kind: 'proxy', takes: ['Half the internet, one config file.', 'A missing semicolon away from an outage.', '502 Bad Gateway: it’s never nginx’s fault.'] },
  { name: 'postgres', kind: 'database', takes: ['The answer to “which database?”', 'EXPLAIN ANALYZE before you blame the ORM.', 'Boring, in the best way.'] },
  { name: 'grafana', kind: 'observability', takes: ['Dashboards, so the graphs can stare back.', 'Everything is fine. The panel is green.', 'Twelve panels, one of them matters.'] },
  { name: 'ghidra', kind: 'reversing', takes: ['Decompile first, ask questions later.', 'Turns machine code back into almost-C.', 'FUN_00401000 has entered the chat.'] },
  { name: 'burp suite', kind: 'security', takes: ['OWASP Top 10 in a GUI.', 'Proxy: because privacy is a suggestion.', 'The only tool where scrolling is productive.'] },
  { name: 'arch linux', kind: 'os', takes: ['btw I use Arch.', 'You’ve manifested this moment.', 'RTFM, or read the wiki. Same thing.'] },
  { name: 'hyprland', kind: 'desktop', takes: ['Tiling window manager > your mental health.', 'Config files: 1, sanity: 0.', 'Xorg? Never heard of her.'] },
  { name: 'claude code', kind: 'tooling', takes: ['Pair programming that never asks for a coffee break.', 'I built a status bar just to watch it work.', 'Permission prompts, answered with a click.'] },
];

// Three numbers, all from the CV.
export const stats = [
  { n: '#30', what: 'in India on CTFtime, 2025', who: 'as captain of Unemployed Nerds' },
  { n: '70+', what: 'public repositories', who: 'most of them finished, some of them useful' },
  { n: '2019', what: 'writing open source since', who: 'it started with Discord bots' },
];
