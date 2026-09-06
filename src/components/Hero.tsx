"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section 
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-center bg-background overflow-hidden"
        >
            {/* Subtle top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
            
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-32">
                <div className="flex flex-col items-start gap-16">
                    {/* Label with signature divider */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="flex items-center gap-4"
                    >
                        <span className="section-divider" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                            Satyajyoti Mohanty
                        </span>
                    </motion.div>

                    {/* Main heading — clean editorial */}
                    <div className="max-w-5xl">
                        <motion.h1
                            className="text-foreground"
                        >
                            <motion.span 
                                className="block"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                            >
                                Full Stack
                            </motion.span>
                            <motion.span 
                                className="block"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
                            >
                                Developer &
                            </motion.span>
                            <motion.span 
                                className="block text-primary"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.16 }}
                            >
                                Problem Solver.
                            </motion.span>
                        </motion.h1>
                        
                        {/* Description — natural, concise */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.24, ease: [0.4, 0, 0.2, 1] }}
                            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed pt-8"
                        >
                            I build software that works as good as it looks. 
                            From responsive interfaces to scalable backends, 
                            I turn complex challenges into clean, functional solutions.
                        </motion.p>
                    </div>

                    {/* Actions — refined */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <motion.button
                            onClick={scrollToProjects}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors relative overflow-hidden"
                        >
                            <span className="relative z-10">View Work</span>
                            <motion.span
                                className="w-4 h-px bg-background relative"
                                initial={{ width: 0 }}
                                whileHover={{ width: 16 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                        
                        <motion.a
                            href="#about"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium text-foreground hover:border-foreground transition-colors"
                        >
                            About
                            <motion.span
                                className="inline-block"
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                →
                            </motion.span>
                        </motion.a>

                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Resume
                            <motion.span
                                className="inline-block"
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </motion.div>

                    {/* Divider with location — cleaner */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex items-center gap-6 pt-8 border-t border-border"
                    >
                        <motion.div 
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            <span>Based in Odisha, India</span>
                        </motion.div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-px h-3 bg-border" />
                            <span>Available for opportunities</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
