"use client";

import { FiGithub, FiLinkedin, FiArrowUp } from "react-icons/fi";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative py-16 bg-background border-t border-border overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#7EE78708_1px,transparent_1px),linear-gradient(to_bottom,#7EE78708_1px,transparent_1px)] bg-[size:64px_64px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 animate-pulse-slow" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 animate-pulse-slow-delayed" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    {/* Left Side - Branding */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 min-w-[40px] min-h-[40px] flex-shrink-0 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center overflow-hidden shadow-lg shadow-primary/20">
                                <img
                                    src="/assets/logo.png"
                                    alt="SatyaJyoti Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-foreground font-bold text-lg">Satyajyoti Mohanty</h3>
                                <p className="text-muted-foreground/70 text-xs">Full Stack Developer</p>
                            </div>
                        </div>
                    </div>

                    {/* Center - Quick Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
                        <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a>
                        <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
                        <a href="#experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</a>
                        <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
                    </div>

                    {/* Right Side - Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/Zenus004"
                            target="_blank"
                            rel="noreferrer"
                            className="group relative p-3 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all hover:scale-110"
                            aria-label="GitHub"
                        >
                            <FiGithub className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/satyajyoti-mohanty-716674266"
                            target="_blank"
                            rel="noreferrer"
                            className="group relative p-3 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-accent/50 transition-all hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                            <div className="absolute inset-0 bg-accent/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center my-8 w-full gap-6">
                    <div className="h-px bg-border flex-1" />
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                        <div className="w-2 h-2 bg-secondary/50 rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--secondary),0.5)]" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-accent/50 rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--accent),0.5)]" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <div className="h-px bg-border flex-1" />
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <div className="flex items-center gap-2 text-muted-foreground/70 text-sm">
                        <span>© {new Date().getFullYear()} Satyajyoti Mohanty. All rights reserved.</span>
                    </div>

                    {/* Scroll to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="group relative p-3 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all hover:scale-110"
                        aria-label="Scroll to top"
                    >
                        <FiArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:-translate-y-1 transition-transform" />
                        <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-pulse {
                        animation: none !important;
                        opacity: 1;
                    }
                }
            `}</style>
        </footer>
    );
}