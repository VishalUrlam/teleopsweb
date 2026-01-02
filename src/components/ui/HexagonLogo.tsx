"use client";

import { motion } from "framer-motion";

export function HexagonLogo({ className = "" }: { className?: string }) {
    return (
        <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
            >
                {/* Hexagon Shape */}
                <path
                    d="M24 4L42.5 14.5V33.5L24 44L5.5 33.5V14.5L24 4Z"
                    fill="url(#hexGradient)"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-teal"
                />

                {/* Inner T for TeleOps */}
                <path
                    d="M16 18H32M24 18V32"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Gradient Definition */}
                <defs>
                    <linearGradient
                        id="hexGradient"
                        x1="5.5"
                        y1="4"
                        x2="42.5"
                        y2="44"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#008080" />
                        <stop offset="1" stopColor="#006666" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    );
}
