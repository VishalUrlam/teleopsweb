"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animated grid background for robotics feel
function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Perspective grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 128, 128, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 128, 128, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    transform: 'perspective(500px) rotateX(60deg)',
                    transformOrigin: 'center top',
                    height: '200%',
                    top: '50%',
                }}
            />
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />
        </div>
    );
}

// Live telemetry display
function TelemetryOverlay() {
    const [data, setData] = useState({
        fps: 60,
        latency: 4.2,
        accuracy: 99.7,
        sessions: 1247
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData({
                fps: 60 + Math.floor(Math.random() * 2 - 1),
                latency: +(4.2 + Math.random() * 0.3 - 0.15).toFixed(1),
                accuracy: +(99.7 + Math.random() * 0.2 - 0.1).toFixed(1),
                sessions: 1247 + Math.floor(Math.random() * 10)
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-24 right-8 hidden lg:block font-mono text-xs"
        >
            <div className="glass-subtle p-4 rounded-lg border-l-2 border-teal">
                <div className="text-foreground-muted mb-2">SYSTEM STATUS</div>
                <div className="space-y-1">
                    <div className="flex justify-between gap-8">
                        <span className="text-foreground-muted">FPS</span>
                        <span className="text-teal">{data.fps}</span>
                    </div>
                    <div className="flex justify-between gap-8">
                        <span className="text-foreground-muted">LATENCY</span>
                        <span className="text-teal">{data.latency}ms</span>
                    </div>
                    <div className="flex justify-between gap-8">
                        <span className="text-foreground-muted">ACCURACY</span>
                        <span className="text-green-400">{data.accuracy}%</span>
                    </div>
                    <div className="flex justify-between gap-8">
                        <span className="text-foreground-muted">LIVE OPS</span>
                        <span className="text-teal">{data.sessions}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Animated robotic hand visual
function RoboticHandVisual() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let time = 0;
        let animationId: number;

        const draw = () => {
            time += 0.025;
            const w = canvas.width;
            const h = canvas.height;

            // Clear canvas
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, w, h);

            // Hand center position
            const centerX = w * 0.5;
            const centerY = h * 0.55;

            // Grip animation (0 = closed, 1 = open)
            const gripAmount = (Math.sin(time * 1.5) + 1) / 2;

            // Draw palm (mechanical base)
            ctx.fillStyle = "#1a2a2a";
            ctx.strokeStyle = "#00b0b0";
            ctx.lineWidth = 3;

            // Palm rectangle
            const palmWidth = 100;
            const palmHeight = 70;
            ctx.beginPath();
            ctx.roundRect(centerX - palmWidth / 2, centerY - palmHeight / 2, palmWidth, palmHeight, 10);
            ctx.fill();
            ctx.stroke();

            // Palm details
            ctx.fillStyle = "#003838";
            ctx.fillRect(centerX - 30, centerY - 20, 60, 40);
            ctx.strokeStyle = "#005050";
            ctx.lineWidth = 1;
            ctx.strokeRect(centerX - 30, centerY - 20, 60, 40);

            // Draw fingers
            const fingerCount = 5;
            const fingerSpacing = 22;
            const startX = centerX - (fingerCount - 1) * fingerSpacing / 2;

            for (let i = 0; i < fingerCount; i++) {
                const fingerX = startX + i * fingerSpacing;
                const isThumb = i === 0;
                const fingerLength = isThumb ? 50 : (i === 2 ? 75 : (i === 1 || i === 3 ? 70 : 55));

                // Finger curl based on grip
                const curl = isThumb ? gripAmount * 0.6 : gripAmount * 0.8;
                const baseAngle = isThumb ? -0.4 : 0;
                const tipAngle = curl * 1.2;

                // Calculate segments
                const segment1Length = fingerLength * 0.45;
                const segment2Length = fingerLength * 0.35;
                const segment3Length = fingerLength * 0.25;

                const joint1X = fingerX + Math.sin(baseAngle) * segment1Length;
                const joint1Y = centerY - palmHeight / 2 - Math.cos(baseAngle) * segment1Length;

                const joint2X = joint1X + Math.sin(baseAngle + tipAngle * 0.5) * segment2Length;
                const joint2Y = joint1Y - Math.cos(baseAngle + tipAngle * 0.5) * segment2Length;

                const tipX = joint2X + Math.sin(baseAngle + tipAngle) * segment3Length;
                const tipY = joint2Y - Math.cos(baseAngle + tipAngle) * segment3Length;

                // Draw finger segments
                ctx.strokeStyle = "#00c0c0";
                ctx.lineWidth = isThumb ? 14 : 12;
                ctx.lineCap = "round";

                // Segment 1
                ctx.beginPath();
                ctx.moveTo(fingerX, centerY - palmHeight / 2);
                ctx.lineTo(joint1X, joint1Y);
                ctx.stroke();

                // Segment 2
                ctx.lineWidth = isThumb ? 12 : 10;
                ctx.beginPath();
                ctx.moveTo(joint1X, joint1Y);
                ctx.lineTo(joint2X, joint2Y);
                ctx.stroke();

                // Segment 3
                ctx.lineWidth = isThumb ? 10 : 8;
                ctx.beginPath();
                ctx.moveTo(joint2X, joint2Y);
                ctx.lineTo(tipX, tipY);
                ctx.stroke();

                // Draw joints
                const drawJoint = (x: number, y: number, size: number) => {
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fillStyle = "#0a1a1a";
                    ctx.fill();
                    ctx.strokeStyle = "#00d0d0";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    // Inner highlight
                    ctx.beginPath();
                    ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = "#00e0e0";
                    ctx.fill();
                };

                drawJoint(fingerX, centerY - palmHeight / 2, 8);
                drawJoint(joint1X, joint1Y, 6);
                drawJoint(joint2X, joint2Y, 5);
            }

            // Draw wrist connection
            ctx.fillStyle = "#1a2a2a";
            ctx.strokeStyle = "#00b0b0";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(centerX - 35, centerY + palmHeight / 2, 70, 25, 5);
            ctx.fill();
            ctx.stroke();

            // Status text
            ctx.font = "bold 11px JetBrains Mono, monospace";
            ctx.textAlign = "center";
            ctx.fillStyle = "#00d0d0";
            ctx.fillText(gripAmount > 0.5 ? "GRIP: OPEN" : "GRIP: CLOSED", centerX, h - 30);

            ctx.font = "10px JetBrains Mono, monospace";
            ctx.fillStyle = "#64748b";
            ctx.fillText("DEXTERITY: 99.7%", centerX, h - 12);

            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={350}
            height={380}
            className="w-full max-w-sm"
        />
    );
}


export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <GridBackground />
            <TelemetryOverlay />

            <div className="container-main relative z-10 py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* YC Badge - Prominent */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap items-center gap-4 mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ff6600]/10 rounded-full border border-[#ff6600]/30">
                                <div className="w-5 h-5 bg-[#ff6600] rounded flex items-center justify-center">
                                    <span className="text-white font-bold text-[10px]">Y</span>
                                </div>
                                <span className="text-xs font-medium text-[#ff6600]">YC W26</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal/10 rounded-full border border-teal/30">
                                <span className="text-xs font-medium text-teal">CVPR 2025</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-glass-bg rounded-full border border-glass-border">
                                <span className="text-xs font-medium text-foreground-muted">Harvard • MIT</span>
                            </div>
                        </motion.div>

                        {/* Main Headline - Bold & Technical */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.9]">
                            <span className="text-foreground">HUMAN</span>
                            <br />
                            <span className="text-foreground">MOTION</span>
                            <br />
                            <span className="text-gradient">TO ROBOT</span>
                        </h1>

                        {/* Technical tagline */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-grow bg-gradient-to-r from-teal to-transparent max-w-24" />
                            <span className="font-mono text-sm text-teal">FULL-BODY TELEOPERATION</span>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-foreground-muted max-w-lg mb-8 leading-relaxed">
                            Turn <span className="text-foreground font-medium">two smartphones</span> into a sub-millimeter motion capture rig.
                            Full-body tracking with <span className="text-teal font-medium">33 keypoints</span> translated to any humanoid robot in real-time.
                        </p>

                        {/* Stats Row */}
                        <div className="flex gap-8 mb-10">
                            {[
                                { value: "2", label: "PHONES" },
                                { value: "33", label: "JOINTS" },
                                { value: "$0", label: "HARDWARE" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <div className="font-mono text-2xl font-bold text-teal">{stat.value}</div>
                                    <div className="text-[10px] tracking-wider text-foreground-muted">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex gap-4">
                            <motion.a
                                href="#demo"
                                className="btn-primary px-8 py-4 text-base font-semibold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Watch Demo
                            </motion.a>
                            <motion.a
                                href="/docs"
                                className="btn-ghost px-8 py-4 text-base font-semibold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Documentation
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right: Robot Arm Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-teal/10 blur-3xl rounded-full" />

                            {/* Robot arm canvas */}
                            <RoboticHandVisual />

                            {/* Technical overlay */}
                            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-foreground-muted">
                                <div>MODEL: TELEOPS-ARM-01</div>
                                <div>STATUS: <span className="text-green-400">ONLINE</span></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom edge accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
        </section>
    );
}
