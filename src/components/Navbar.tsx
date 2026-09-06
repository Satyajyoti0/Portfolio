"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin } from "react-icons/fi";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        let scrollFrame: number;
        const handleScroll = () => {
            cancelAnimationFrame(scrollFrame);
            scrollFrame = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 20);
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    setActiveSection(`#${visibleEntries[0].target.id}`);
                }
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        navLinks.forEach((link) => {
            const id = link.href.substring(1);
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(scrollFrame);
            observer.disconnect();
        };
    }, []);

    // close mobile menu on navigation (helps SPA anchors)
    const handleNavClick = () => setIsOpen(false);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Enhanced Logo */}
                    <div className="flex-shrink-0 group">
                        <Link href="/" className="flex items-center gap-3">
                            {/* Logo Image bypasses next/image cache issues */}
                            <div className="relative w-12 h-12 min-w-[48px] min-h-[48px] flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20 border border-border">
                                <img
                                    src="/assets/logo.png"
                                    alt="SatyaJyoti Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="text-xl font-bold tracking-tight select-none mt-1 hidden sm:block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    Satya
                                </span>
                                <span className="text-foreground">jyoti</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1 bg-card/50 backdrop-blur-sm rounded-full px-2 py-2 border border-border">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === link.href ? "text-background font-semibold" : "text-muted-foreground hover:text-foreground"
                                        }`}
                                    onClick={handleNavClick}
                                >
                                    {activeSection === link.href && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full" />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Social Icons (Desktop) */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://github.com/Zenus004"
                            target="_blank"
                            rel="noreferrer"
                            className="group relative p-2.5 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all hover:scale-110"
                            aria-label="GitHub"
                        >
                            <FiGithub className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/satyajyoti-mohanty-716674266"
                            target="_blank"
                            rel="noreferrer"
                            className="group relative p-2.5 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-accent/50 transition-all hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                            <div className="absolute inset-0 bg-accent/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen((v) => !v)}
                            className="relative p-3 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FiX className="w-6 h-6 text-foreground" /> : <FiMenu className="w-6 h-6 text-foreground" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="md:hidden"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-3 bg-background/95 backdrop-blur-xl border-b border-border/50">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group relative block px-5 py-3 rounded-xl bg-card/50 border border-border hover:border-primary/50 transition-all overflow-hidden animate-fade-in"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                    onClick={() => {
                                        handleNavClick();
                                        setTimeout(() => {
                                            const id = link.href.replace("#", "");
                                            const el = document.getElementById(id);
                                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }, 80);
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative z-10 text-muted-foreground group-hover:text-foreground font-medium transition-colors">
                                        {link.name}
                                    </span>
                                </Link>
                            ))}

                            {/* Mobile Social Links */}
                            <div className="flex gap-3 pt-4 border-t border-border">
                                <a
                                    href="https://github.com/Zenus004"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 group relative p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all flex items-center justify-center"
                                    aria-label="GitHub"
                                >
                                    <FiGithub className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/satyajyoti-mohanty-716674266"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 group relative p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-accent/50 transition-all flex items-center justify-center"
                                    aria-label="LinkedIn"
                                >
                                    <FiLinkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                                    <div className="absolute inset-0 bg-accent/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-slide-down,
          .animate-fade-in {
            animation: none !important;
            opacity: 1;
          }
        }
      `}</style>
        </nav>
    );
}