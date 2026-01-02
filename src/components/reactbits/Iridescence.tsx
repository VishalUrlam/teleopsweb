"use client";

import { useEffect, useRef } from "react";

interface IridescenceProps {
    className?: string;
    speed?: number;
    intensity?: number;
    colors?: string[];
}

export function Iridescence({
    className = "",
    speed = 0.003,
    intensity = 0.6,
    colors = ["#008080", "#64748b", "#475569", "#006666"],
}: IridescenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        };

        resize();
        window.addEventListener("resize", resize);

        // Convert hex to RGB
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16),
                }
                : { r: 0, g: 0, b: 0 };
        };

        const rgbColors = colors.map(hexToRgb);

        const animate = () => {
            time += speed;
            const width = canvas.width;
            const height = canvas.height;

            // Clear with dark background
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, width, height);

            // Create iridescent blobs
            const numBlobs = 5;
            for (let i = 0; i < numBlobs; i++) {
                const colorIdx = i % rgbColors.length;
                const color = rgbColors[colorIdx];

                const x = width * (0.3 + 0.4 * Math.sin(time * (0.5 + i * 0.2) + i));
                const y = height * (0.3 + 0.4 * Math.cos(time * (0.4 + i * 0.15) + i * 1.5));
                const radius = Math.min(width, height) * (0.2 + 0.1 * Math.sin(time + i));

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity})`);
                gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity * 0.5})`);
                gradient.addColorStop(1, "transparent");

                ctx.globalCompositeOperation = "screen";
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Add noise texture effect
            ctx.globalCompositeOperation = "overlay";
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const noise = (Math.random() - 0.5) * 15;
                data[i] = Math.min(255, Math.max(0, data[i] + noise));
                data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
                data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
            }
            ctx.putImageData(imageData, 0, 0);

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [speed, intensity, colors]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full ${className}`}
            style={{ mixBlendMode: "screen" }}
        />
    );
}
