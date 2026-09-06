"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";
import ProjectModal from "./ProjectModal";
import { FiGithub, FiExternalLink, FiStar, FiFolder } from "react-icons/fi";

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    const categories = useMemo(() => {
        //Category set
        return ["All", "Next.js", "React", "Node.js", "TypeScript"];
    }, []);

    const filteredProjects = projectsData.filter((project) => {
        if (selectedCategory === "All") return true;
        return project.tech?.includes(selectedCategory);
    });

    return (
        <section id="projects" className="scroll-mt-14 relative py-8 bg-background overflow-hidden">
            {/* Background Elements */}
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
            <div className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,#7EE78708_1px,transparent_1px),linear-gradient(to_bottom,#7EE78708_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Animated Orbs */}
            <div className="hidden md:block absolute top-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="hidden md:block absolute bottom-40 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow-delayed" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-mono border border-secondary/20 flex items-center gap-2 mx-auto w-fit">
                            <FiFolder className="w-4 h-4" />
                            $ ls ~/projects
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-foreground">Featured</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Projects
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                ? "text-background scale-105"
                                : "bg-card/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                                }`}
                        >
                            {selectedCategory === category && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/20"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* Card */}
                                <div className="relative h-full bg-card/50 rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-500">
                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                                    {/* Image Area */}
                                    <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl border-b border-border/50">

                                        {/* Project Image */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Dark gradient overlay for readability */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

                                        {/* Quick Action Buttons */}
                                        <div
                                            className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${hoveredProject === project.id
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 -translate-y-2"
                                                }`}
                                        >
                                            <a
                                                href={project.repo ?? "#"}
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border hover:border-primary/50 transition-colors"
                                            >
                                                <FiGithub className="w-4 h-4 text-muted-foreground" />
                                            </a>

                                            <a
                                                href={project.demo ?? "#"}
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border hover:border-primary/50 transition-colors"
                                            >
                                                <FiExternalLink className="w-4 h-4 text-muted-foreground" />
                                            </a>
                                        </div>

                                        {/* Featured Badge */}
                                        {/* <div className="absolute bottom-4 left-4">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/20 backdrop-blur-sm">
                                                <FiStar className="w-3 h-3" />
                                                Featured
                                            </span>
                                        </div> */}
                                    </div>

                                    {/* Content Area */}
                                    <div className="relative p-6 flex flex-col">
                                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                                            {project.title}
                                        </h3>

                                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack Tags */}
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tech?.slice(0, 3).map((tech: string) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20 hover:border-primary/40 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech && project.tech.length > 3 && (
                                                <span className="px-3 py-1 rounded-lg bg-card text-muted-foreground text-xs font-medium border border-border">
                                                    +{project.tech.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* View More Indicator */}
                                        <div className={`flex items-center gap-2 mt-4 pt-4 border-t border-border text-primary text-sm font-medium transition-all duration-300 ${hoveredProject === project.id ? 'translate-x-2' : ''
                                            }`}>
                                            View Details
                                            <FiExternalLink className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Corner Accent */}
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Card Shadow/Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal for project details (kept from original) */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />

            <style jsx>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.15; transform: scale(1.05); }
                }
                .animate-gradient-shift {
                    animation: gradient-shift 3s ease infinite;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .animate-fade-in-up-delayed {
                    animation: fade-in-up 0.8s ease-out 0.2s forwards;
                    opacity: 0;
                }
                .animate-fade-in-up-final {
                    animation: fade-in-up 0.8s ease-out 0.6s forwards;
                    opacity: 0;
                }
                .animate-scale-in {
                    animation: scale-in 0.6s ease-out forwards;
                    opacity: 0;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .animate-pulse-slow-delayed {
                    animation: pulse-slow 4s ease-in-out infinite;
                    animation-delay: 2s;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-gradient-shift,
                    .animate-fade-in-up,
                    .animate-fade-in-up-delayed,
                    .animate-fade-in-up-final,
                    .animate-scale-in,
                    .animate-pulse-slow,
                    .animate-pulse-slow-delayed {
                        animation: none !important;
                        opacity: 1;
                    }
                }
            `}</style>
        </section>
    );
}