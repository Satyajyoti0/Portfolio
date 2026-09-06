"use client";

import { motion } from "framer-motion";

export default function Hero() {
    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center bg-background">
            {/* Grid line accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
            
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-32">
                <div className="flex flex-col items-start gap-16">
                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <span className="w-10 h-px bg-primary"></span>
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Satyajyoti Mohanty
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <div className="max-w-5xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-foreground"
                        >
                            <span className="block">Full Stack</span>
                            <span className="block">Developer &</span>
                            <span className="block text-primary">Problem Solver.</span>
                        </motion.h1>
                        
                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed pt-8"
                        >
                            I build software that works as good as it looks. 
                            From responsive interfaces to scalable backends, 
                            I turn complex challenges into clean, functional solutions.
                        </motion.p>
                    </div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <button
                            onClick={scrollToProjects}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors"
                        >
                            View Work
                        </button>
                        
                        <a
                            href="#about"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium text-foreground hover:border-foreground transition-colors"
                        >
                            About
                        </a>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Resume →
                        </a>
                    </motion.div>

                    {/* Divider with location */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center gap-6 pt-8 border-t border-border"
                    >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span>Based in Odisha, India</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Available for opportunities</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
