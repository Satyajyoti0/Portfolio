"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useActiveSection } from "@/hooks/Useactivesection";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const { activeSection, scrolled } = useActiveSection(["about", "skills", "projects", "experience", "contact"]);

    // Handle scroll direction for navbar visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolledDown(currentScrollY > lastScrollY && currentScrollY > 100);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleNavClick = () => setIsOpen(false);

    return (
        <nav 
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
            } ${isScrolledDown && !isOpen ? '-translate-y-full' : 'translate-y-0'}`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="group relative"
                    >
                        <motion.span 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm font-semibold text-foreground tracking-tight inline-block"
                        >
                            SM.
                        </motion.span>
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={handleNavClick}
                                    className="relative text-xs font-medium transition-colors duration-300 uppercase tracking-wide group"
                                >
                                    <span className={`${
                                        isActive 
                                            ? 'text-foreground' 
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}>
                                        {link.name}
                                    </span>
                                    <span className={`absolute -bottom-2 left-0 h-px bg-primary transition-all duration-300 ${
                                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-foreground"
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiX className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FiMenu className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-3">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => {
                                            handleNavClick();
                                            setTimeout(() => {
                                                const id = link.href.replace("#", "");
                                                const el = document.getElementById(id);
                                                if (el) el.scrollIntoView({ behavior: "smooth" });
                                            }, 50);
                                        }}
                                        className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
