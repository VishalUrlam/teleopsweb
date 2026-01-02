"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Problem {
    id: string;
    code: string;
    title: string;
    description: string;
    failCase: string;
    failDetail: string;
    metrics: { label: string; value: string; bad: boolean }[];
}

const problems: Problem[] = [
    {
        id: "video",
        code: "ERR_001",
        title: "Video Demonstrations",
        description: "Monocular camera footage lacks depth information, camera intrinsics, and precise spatial relationships required for robot manipulation tasks.",
        failCase: "NO DEPTH",
        failDetail: "Cannot compute 3D workspace coordinates",
        metrics: [
            { label: "Depth Data", value: "N/A", bad: true },
            { label: "Precision", value: "~50mm", bad: true },
            { label: "Cost", value: "$0", bad: false },
        ],
    },
    {
        id: "sim",
        code: "ERR_002",
        title: "Simulation Training",
        description: "Synthetic environments cannot replicate material properties, lighting conditions, and physical dynamics of the real world.",
        failCase: "SIM2REAL GAP",
        failDetail: "85% policy degradation on transfer",
        metrics: [
            { label: "Transfer Rate", value: "15%", bad: true },
            { label: "Fidelity", value: "LOW", bad: true },
            { label: "Iteration", value: "FAST", bad: false },
        ],
    },
    {
        id: "vr",
        code: "ERR_003",
        title: "VR Teleoperation",
        description: "Specialized hardware requirements create prohibitive costs and limit the scale of data collection operations.",
        failCase: "$3K+ SETUP",
        failDetail: "Cannot scale to 1000s of operators",
        metrics: [
            { label: "Hardware", value: "$3,000", bad: true },
            { label: "Training", value: "2 HRS", bad: true },
            { label: "Quality", value: "HIGH", bad: false },
        ],
    },
];

export function ProblemSection() {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <section id="technology" className="section-padding relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            repeating-linear-gradient(
                                90deg,
                                transparent,
                                transparent 100px,
                                rgba(0, 128, 128, 0.03) 100px,
                                rgba(0, 128, 128, 0.03) 101px
                            )
                        `,
                    }}
                />
            </div>

            <div className="container-main relative z-10">
                {/* Section Header - Left aligned, technical */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="font-mono text-sm text-red-400 tracking-wider">FAILURE ANALYSIS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                        Why Current Methods
                        <br />
                        <span className="text-foreground-muted">Don&apos;t Work</span>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl">
                        Existing data collection approaches have fundamental limitations that prevent robotics teams from scaling.
                    </p>
                </motion.div>

                {/* Problem Cards - Stacked, expandable */}
                <div className="space-y-4">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={problem.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div
                                className={`
                                    relative cursor-pointer transition-all duration-200
                                    border border-glass-border rounded-xl overflow-hidden
                                    ${activeId === problem.id ? 'bg-glass-bg' : 'bg-transparent hover:bg-glass-bg/50'}
                                `}
                                onClick={() => setActiveId(activeId === problem.id ? null : problem.id)}
                            >
                                {/* Main row */}
                                <div className="flex items-center gap-6 p-6">
                                    {/* Error code */}
                                    <div className="hidden md:block font-mono text-sm text-red-400 w-20">
                                        {problem.code}
                                    </div>

                                    {/* Failure badge */}
                                    <div className="hidden sm:flex items-center justify-center px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-md min-w-32">
                                        <span className="font-mono text-xs text-red-400 font-bold">
                                            {problem.failCase}
                                        </span>
                                    </div>

                                    {/* Title and description */}
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold mb-1">{problem.title}</h3>
                                        <p className="text-sm text-foreground-muted line-clamp-1">
                                            {problem.description}
                                        </p>
                                    </div>

                                    {/* Expand indicator */}
                                    <motion.div
                                        animate={{ rotate: activeId === problem.id ? 180 : 0 }}
                                        className="text-foreground-muted"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </div>

                                {/* Expanded content */}
                                <AnimatePresence>
                                    {activeId === problem.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-2 border-t border-glass-border">
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    {/* Left: Details */}
                                                    <div>
                                                        <p className="text-foreground-muted mb-4">
                                                            {problem.description}
                                                        </p>
                                                        <div className="flex items-center gap-3 text-red-400">
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                            </svg>
                                                            <span className="font-mono text-sm">{problem.failDetail}</span>
                                                        </div>
                                                    </div>

                                                    {/* Right: Metrics */}
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {problem.metrics.map((metric, i) => (
                                                            <div
                                                                key={i}
                                                                className={`
                                                                    p-4 rounded-lg text-center
                                                                    ${metric.bad ? 'bg-red-500/10 border border-red-500/20' : 'bg-teal/10 border border-teal/20'}
                                                                `}
                                                            >
                                                                <div className={`font-mono text-lg font-bold ${metric.bad ? 'text-red-400' : 'text-teal'}`}>
                                                                    {metric.value}
                                                                </div>
                                                                <div className="text-[10px] text-foreground-muted tracking-wider mt-1">
                                                                    {metric.label}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Left accent line */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${activeId === problem.id ? 'bg-red-500' : 'bg-transparent'}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
