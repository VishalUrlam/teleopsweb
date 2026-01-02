"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
    text: string;
    className?: string;
    speed?: number; // ms per character
    delay?: number; // ms before animation starts
    revealDirection?: "start" | "end" | "center" | "random";
    characters?: string;
    animateOn?: "view" | "hover";
}

export function DecryptedText({
    text,
    className = "",
    speed = 50,
    delay = 0,
    revealDirection = "start",
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
    animateOn = "view",
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    const getRevealOrder = (length: number) => {
        const indices = Array.from({ length }, (_, i) => i);

        switch (revealDirection) {
            case "end":
                return indices.reverse();
            case "center": {
                const result: number[] = [];
                let left = Math.floor(length / 2);
                let right = left + 1;
                while (left >= 0 || right < length) {
                    if (left >= 0) result.push(left--);
                    if (right < length) result.push(right++);
                }
                return result;
            }
            case "random":
                return indices.sort(() => Math.random() - 0.5);
            default:
                return indices;
        }
    };

    const startAnimation = () => {
        if (isAnimating || (animateOn === "view" && hasAnimated)) return;

        setIsAnimating(true);
        const revealOrder = getRevealOrder(text.length);
        const revealed = new Set<number>();

        let frame = 0;
        const totalFrames = text.length + 10;

        const animate = () => {
            frame++;

            // Reveal characters based on frame count
            const charsToReveal = Math.floor((frame / totalFrames) * text.length);
            for (let i = 0; i < charsToReveal && i < revealOrder.length; i++) {
                revealed.add(revealOrder[i]);
            }

            // Build display string
            let newText = "";
            for (let i = 0; i < text.length; i++) {
                if (text[i] === " ") {
                    newText += " ";
                } else if (revealed.has(i)) {
                    newText += text[i];
                } else {
                    newText += characters[Math.floor(Math.random() * characters.length)];
                }
            }

            setDisplayText(newText);

            if (frame < totalFrames) {
                setTimeout(animate, speed);
            } else {
                setDisplayText(text);
                setIsAnimating(false);
                setHasAnimated(true);
            }
        };

        setTimeout(animate, delay);
    };

    useEffect(() => {
        if (animateOn !== "view") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAnimation();
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [text]);

    return (
        <motion.span
            ref={containerRef}
            className={`font-mono inline-block ${className}`}
            onMouseEnter={animateOn === "hover" ? startAnimation : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayText}
        </motion.span>
    );
}
