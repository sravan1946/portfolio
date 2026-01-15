"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const jobs = [
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

function ExperienceCard({ job, index }: { job: typeof jobs[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -50 : 50]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-cyan-500/50 transition-colors">
                <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <h3 className="font-bold text-xl text-white">{job.company}</h3>
                    <span className="text-xs font-mono text-cyan-400 border border-cyan-500/20 px-2 py-1 rounded bg-cyan-500/5">{job.period}</span>
                </div>
                <div className="text-slate-300 font-medium mb-2">{job.role}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{job.description}</p>
            </div>
        </motion.div>
    );
}

export function Experience() {
    return (
        <section id="experience" className="py-24 px-6 relative">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center">Journey</h2>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                    {jobs.map((job, index) => (
                        <ExperienceCard key={job.company} job={job} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
