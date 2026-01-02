"use client";

import { useEffect, useRef, useMemo } from "react";

interface HyperspeedProps {
    className?: string;
    speed?: number; // Multiplier for animation speed (0.5 = half speed)
    lineCount?: number;
    colors?: string[];
}

export function Hyperspeed({
    className = "",
    speed = 0.5, // Slowed down for "heavy" industrial feel
    lineCount = 100,
    colors = ["#008080", "#64748b", "#94a3b8", "#475569"],
}: HyperspeedProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const lines = useMemo(() => {
        return Array.from({ length: lineCount }, () => ({
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
            z: Math.random() * 1000,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
    }, [lineCount, colors]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let width = 0;
        let height = 0;

        const resize = () => {
            width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resize();
        window.addEventListener("resize", resize);

        const animate = () => {
            const canvasWidth = canvas.offsetWidth;
            const canvasHeight = canvas.offsetHeight;
            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;
            const focalLength = 256;

            ctx.fillStyle = "rgba(10, 10, 10, 0.15)"; // Trail effect
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            for (const line of lines) {
                // Move lines toward viewer
                line.z -= 2 * speed;

                // Reset lines that pass the camera
                if (line.z <= 0) {
                    line.z = 1000;
                    line.x = Math.random() * 2 - 1;
                    line.y = Math.random() * 2 - 1;
                }

                // Project 3D to 2D
                const scale = focalLength / line.z;
                const x2d = centerX + line.x * canvasWidth * scale;
                const y2d = centerY + line.y * canvasHeight * scale;

                // Previous position for line drawing
                const prevZ = line.z + 20 * speed;
                const prevScale = focalLength / prevZ;
                const prevX2d = centerX + line.x * canvasWidth * prevScale;
                const prevY2d = centerY + line.y * canvasHeight * prevScale;

                // Draw line with fade based on distance
                const opacity = Math.min(1, (1000 - line.z) / 500);
                const lineWidth = Math.max(0.5, scale * 2);

                ctx.beginPath();
                ctx.strokeStyle = line.color + Math.floor(opacity * 255).toString(16).padStart(2, "0");
                ctx.lineWidth = lineWidth;
                ctx.moveTo(prevX2d, prevY2d);
                ctx.lineTo(x2d, y2d);
                ctx.stroke();
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [lines, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full ${className}`}
            style={{ background: "#0a0a0a" }}
        />
    );
}
