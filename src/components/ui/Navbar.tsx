"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HexagonLogo } from "./HexagonLogo";
import { ThemeToggle } from "./ThemeToggle";
import { YCBadge } from "./YCBadge";

const navLinks = [
    { name: "Technology", href: "#technology" },
    { name: "Data", href: "#data" },
    { name: "Pricing", href: "#pricing" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "glass py-3"
                    : "bg-transparent py-5"
                }`}
        >
            <nav className="container-main flex items-center justify-between">
                {/* Logo + Brand */}
                <a href="/" className="flex items-center gap-3">
                    <HexagonLogo />
                    <span className="text-xl font-semibold tracking-tight">TeleOps</span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="/signin"
                        className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
                    >
                        Sign In
                    </a>
                    <ThemeToggle />
                    <YCBadge />
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center glass-subtle rounded-lg"
                    aria-label="Toggle mobile menu"
                >
                    <motion.div
                        animate={isMobileMenuOpen ? "open" : "closed"}
                        className="relative w-5 h-4"
                    >
                        <motion.span
                            variants={{
                                closed: { rotate: 0, y: 0 },
                                open: { rotate: 45, y: 6 },
                            }}
                            className="absolute top-0 left-0 w-5 h-0.5 bg-current rounded-full"
                        />
                        <motion.span
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 },
                            }}
                            className="absolute top-1.5 left-0 w-5 h-0.5 bg-current rounded-full"
                        />
                        <motion.span
                            variants={{
                                closed: { rotate: 0, y: 0 },
                                open: { rotate: -45, y: -6 },
                            }}
                            className="absolute bottom-0 left-0 w-5 h-0.5 bg-current rounded-full"
                        />
                    </motion.div>
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium py-2 border-b border-glass-border"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex items-center justify-between pt-4">
                                <a href="/signin" className="text-sm font-medium">
                                    Sign In
                                </a>
                                <div className="flex items-center gap-3">
                                    <ThemeToggle />
                                    <YCBadge />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
