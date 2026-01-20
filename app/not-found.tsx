"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, AlertTriangle, ChevronRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black font-mono text-red-500 select-none">

            {/* 1. Background Grid / Radar Scan */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 shadow-[0_0_20px_rgba(255,0,0,0.5)] animate-scan" />
            </div>

            {/* 2. Massive Background Warning */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <AlertTriangle className="w-[80vw] h-[80vw] text-red-600" />
            </div>

            {/* 3. Main Security HUD Card */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-lg w-full bg-black/80 backdrop-blur-md border border-red-500/30 p-1  shadow-[0_0_50px_rgba(220,38,38,0.2)]"
            >
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-500" />

                <div className="p-8 flex flex-col items-center text-center border border-red-500/10 h-full relative overflow-hidden">
                    {/* Scanline overlay for the card */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.05)_50%)] bg-[size:100%_4px] pointer-events-none" />

                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                        className="mb-6 p-4 rounded-full border-2 border-red-500/50 bg-red-950/30 shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                    >
                        <Lock className="w-12 h-12 text-red-500" />
                    </motion.div>

                    <h1 className="text-5xl font-black tracking-widest text-red-500 mb-2 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                        404
                    </h1>

                    <div className="bg-red-500 text-black font-bold px-3 py-1 text-sm tracking-wide mb-6">
                        ACCESS DENIED
                    </div>

                    <p className="text-red-400/80 mb-8 max-w-xs text-sm leading-relaxed uppercase tracking-wider">
                        Security Protocol Initiated. <br />
                        The sector you are trying to access is restricted or does not exist.
                    </p>

                    {/* Emergency Eject Button */}
                    <Link href="/" className="w-full">
                        <button className="group relative w-full overflow-hidden bg-red-950/50 hover:bg-red-900/50 border border-red-500/50 transition-all duration-300 py-4 px-6 flex items-center justify-between">
                            <div className="absolute inset-0 w-1 h-full bg-red-500 group-hover:w-full opacity-20 transition-all duration-300 left-0" />

                            <span className="flex items-center gap-2 relative z-10 text-red-400 group-hover:text-red-300">
                                <ShieldAlert className="w-4 h-4" />
                                <span className="font-bold tracking-widest text-xs">EMERGENCY EJECT</span>
                            </span>

                            <ChevronRight className="w-4 h-4 text-red-500 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>

                    {/* Bottom Tech Details */}
                    <div className="mt-6 w-full flex justify-between text-[10px] text-red-500/40 font-mono border-t border-red-500/20 pt-2">
                        <span>ERR_CODE: 0x404</span>
                        <span>ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                    </div>
                </div>
            </motion.div>

            <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
        </div>
    );
}
