"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
    children: ReactNode;
    className?: string;
    spotlightColor?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(0, 128, 128, 0.15)",
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
}: SpotlightCardProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
        onMouseEnterProp?.();
    };
    const handleMouseLeave = () => {
        setOpacity(0);
        onMouseLeaveProp?.();
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl ${className}`}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
