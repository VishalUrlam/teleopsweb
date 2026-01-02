"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltedCardProps {
    children: ReactNode;
    className?: string;
    maxTilt?: number;
    scale?: number;
    perspective?: number;
}

export function TiltedCard({
    children,
    className = "",
    maxTilt = 15,
    scale = 1.02,
    perspective = 1000,
}: TiltedCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 300, damping: 30 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective,
                rotateX,
                rotateY,
            }}
            animate={{ scale: isHovered ? scale : 1 }}
            transition={{ duration: 0.2 }}
            className={`relative ${className}`}
        >
            {/* Shine/Glare Effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
                style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)",
                    opacity: isHovered ? 0.6 : 0,
                }}
            />

            {/* Content Container */}
            <div className="relative overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl">
                {children}
            </div>
        </motion.div>
    );
}
