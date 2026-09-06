"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import projectsData from "@/data/projects.json";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function Projects() {
    return (
        <section id="projects" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <motion.div 
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Projects</span>
                    <h2 className="text-3xl font-bold text-foreground mt-2">Selected Work</h2>
                </motion.div>

                {/* Projects list */}
                <div className="space-y-24">
                    {projectsData.map((project, index) => {
                        const isEven = index % 2 === 0;
                        
                        return (
                            <ProjectItem 
                                key={project.id} 
                                project={project} 
                                index={index}
                                isEven={isEven}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function ProjectItem({ project, index, isEven }: { project: typeof projectsData[0], index: number, isEven: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    // Image hover effect with spring
    const imgX = useMotionValue(0);
    const imgY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(imgX, springConfig);
    const smoothY = useSpring(imgY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        imgX.set(x);
        imgY.set(y);
    };

    const handleMouseLeave = () => {
        imgX.set(0);
        imgY.set(0);
    };

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="group grid lg:grid-cols-12 gap-10 items-start"
        >
            {/* Content - alternates sides */}
            <motion.div 
                className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            >
                {/* Project number */}
                <motion.span 
                    className="inline-block text-xs font-mono text-primary mb-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.1 }}
                >
                    {String(project.id).padStart(2, '0')}
                </motion.span>
                
                <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech?.slice(0, 6).map((tech: string, i: number) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
                            whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
                            className="px-2.5 py-1 text-xs border border-border text-muted-foreground hover:text-foreground transition-colors cursor-default"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                    <motion.a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors arrow-link"
                    >
                        <FiGithub className="w-4 h-4" />
                        Repository
                    </motion.a>
                    {project.demo && (
                        <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors arrow-link"
                        >
                            <FiExternalLink className="w-4 h-4" />
                            Live Site
                        </motion.a>
                    )}
                </div>
            </motion.div>

            {/* Image */}
            <motion.div 
                className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 + 0.15 }}
            >
                <div 
                    className="aspect-video bg-card border border-border overflow-hidden"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        style={{ x: smoothX, y: smoothY, scale: 1.05 }}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                    />
                </div>
            </motion.div>
        </motion.article>
    );
}
