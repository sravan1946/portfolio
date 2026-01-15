"use client";

import { useEffect, useRef } from "react";

export function MatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Characters to drop
        const characters = "01010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";
        const charArray = characters.split("");

        const fontSize = 14;
        const columns = Math.ceil(width / fontSize);

        // Array to track the y position of each column drops
        const drops: number[] = new Array(columns).fill(0); // init all drops at y=0

        // Initialize drops with random starting positions so they don't all fall together at start
        for (let i = 0; i < drops.length; i++) {
            drops[i] = Math.random() * -100; // Start above screen
        }

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(3, 7, 18, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#0f0"; // Fallback
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Color logic: Some are bright cyan, some are purple/dim
                const isBright = Math.random() > 0.95;
                ctx.fillStyle = isBright ? "#22d3ee" : "#0e7490"; // cyan-400 vs cyan-700

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly after it has crossed screen
                // Random check ensures they don't all reset at once
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Increment y coordinate
                drops[i]++;
            }
        };

        let animationId: number;
        const animate = () => {
            draw();
            animationId = requestAnimationFrame(animate);
        }

        // Throttling frames for "digital" feel + performance
        const interval = setInterval(draw, 33); // ~30FPS

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-init columns on resize
            const newColumns = Math.ceil(width / fontSize);
            // Preserve existing drops if possible, or extend
            if (newColumns > drops.length) {
                const added = new Array(newColumns - drops.length).fill(0);
                drops.push(...added);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        />
    );
}
