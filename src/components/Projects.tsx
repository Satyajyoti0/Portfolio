"use client";

import projectsData from "@/data/projects.json";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function Projects() {
    return (
        <section id="projects" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <div className="mb-20">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Projects</span>
                    <h2 className="text-3xl font-bold text-foreground mt-2">Selected Work</h2>
                </div>

                {/* Projects list */}
                <div className="space-y-24">
                    {projectsData.map((project, index) => {
                        const isEven = index % 2 === 0;
                        
                        return (
                            <article
                                key={project.id}
                                className="group grid lg:grid-cols-12 gap-10 items-start"
                            >
                                {/* Content - alternates sides */}
                                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                    {/* Project number */}
                                    <span className="inline-block text-xs font-mono text-muted-foreground mb-4">
                                        {String(project.id).padStart(2, '0')}
                                    </span>
                                    
                                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                                        {project.title}
                                    </h3>
                                    
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech?.slice(0, 6).map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 text-xs border border-border text-muted-foreground hover:border-foreground transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                        >
                                            <FiGithub className="w-4 h-4" />
                                            Repository
                                        </a>
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                            >
                                                <FiExternalLink className="w-4 h-4" />
                                                Live Site
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <div className="aspect-video bg-card border border-border overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
