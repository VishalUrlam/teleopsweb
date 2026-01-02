"use client";

import { motion } from "framer-motion";
import { StereoVisionDemo } from "@/components/reactbits/StereoVisionDemo";
import { MotionTrackingDemo } from "@/components/reactbits/MotionTrackingDemo";

export function SolutionSection() {
    return (
        <section id="data" className="section-padding relative overflow-hidden">
            {/* Diagonal accent */}
            <div
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-teal/5 to-transparent"
                style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
            />

            <div className="container-main relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-2 h-2 bg-teal rounded-full" />
                        <span className="font-mono text-sm text-teal tracking-wider">SOLUTION</span>
                        <div className="h-px flex-grow bg-gradient-to-r from-teal/50 to-transparent max-w-32" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                        Two Phones.
                        <br />
                        <span className="text-gradient">Stereo Vision.</span>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl">
                        Sub-millimeter precision using just two smartphones.
                        Full-body motion capture with 33 keypoints, translated to any robot in real-time.
                    </p>
                </motion.div>

                {/* Dual Demo: Stereo Vision + Motion Tracking */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-20"
                >
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Left: Stereo Vision */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg">Human Pose Capture</h3>
                            </div>
                            <StereoVisionDemo />
                        </div>

                        {/* Right: Motion Tracking */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg">Robot Translation</h3>
                            </div>
                            <MotionTrackingDemo />
                        </div>
                    </div>
                </motion.div>

                {/* Technical Specs Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <div className="grid md:grid-cols-5 gap-1 bg-glass-border rounded-xl overflow-hidden">
                        {[
                            { label: "BODY JOINTS", value: "33", sub: "Full skeleton" },
                            { label: "HAND JOINTS", value: "42", sub: "Per hand: 21" },
                            { label: "LATENCY", value: "<5ms", sub: "Real-time" },
                            { label: "DEXTERITY", value: "99.7%", sub: "Motion fidelity" },
                            { label: "ROBOTS", value: "ANY", sub: "Universal SDK" },
                        ].map((spec, i) => (
                            <div
                                key={i}
                                className="bg-background p-6 text-center group hover:bg-teal/5 transition-colors"
                            >
                                <div className="font-mono text-[10px] text-foreground-muted tracking-wider mb-2">
                                    {spec.label}
                                </div>
                                <div className="font-mono text-2xl md:text-3xl font-bold text-teal mb-1 group-hover:scale-105 transition-transform">
                                    {spec.value}
                                </div>
                                <div className="text-xs text-foreground-muted">
                                    {spec.sub}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Research Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="mt-16"
                >
                    <div className="glass-card p-6 md:p-8 border-l-4 border-teal">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-xl bg-teal/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-teal/20 text-teal text-xs font-mono rounded">CVPR 2025</span>
                                    <span className="px-2 py-0.5 bg-glass-bg text-foreground-muted text-xs font-mono rounded">Harvard • MIT</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Proprietary Video Bandwidth Optimization</h3>
                                <p className="text-foreground-muted text-sm">
                                    Our research on neural video compression reduces bandwidth by 94% while maintaining sub-millimeter tracking precision.
                                    This enables real-time teleoperation over standard mobile networks with {"<"}5ms latency.
                                </p>
                            </div>
                            <div className="flex-shrink-0 hidden lg:block">
                                <div className="text-center">
                                    <div className="font-mono text-3xl font-bold text-teal">94%</div>
                                    <div className="text-xs text-foreground-muted">Bandwidth Reduction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* How it works */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-20"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-mono text-sm text-foreground-muted">HOW IT WORKS</span>
                        <div className="h-px flex-grow bg-glass-border" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Mount Two Phones",
                                description: "Set up two smartphones for stereo vision. Auto-calibration in 60 seconds. Zero additional hardware."
                            },
                            {
                                step: "02",
                                title: "Translate to Robot",
                                description: "AI maps human dexterity to any humanoid robot's kinematics in real-time."
                            },
                            {
                                step: "03",
                                title: "Execute & Learn",
                                description: "Robot executes movements while learning from human demonstrations."
                            },
                        ].map((item, i) => (
                            <div key={i} className="relative pl-16">
                                <div className="font-mono text-5xl font-black text-teal absolute top-0 left-0 opacity-80">
                                    {item.step}
                                </div>
                                <div className="relative">
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-foreground-muted">{item.description}</p>
                                </div>
                                {i < 2 && (
                                    <div className="hidden md:block absolute top-6 -right-4 w-8 h-px bg-gradient-to-r from-teal/50 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
