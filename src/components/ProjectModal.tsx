"use client";

import { useState } from "react";
import { FiX, FiGithub, FiExternalLink, FiCode, FiZap } from "react-icons/fi";

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    image: string;
    repo: string;
    demo: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!project) return null;

    return (
        <>
            {isOpen && (
                <>
                    {/* Enhanced Backdrop */}
                    <div
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 animate-fade-in cursor-pointer"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(126, 231, 135, 0.1) 0%, transparent 50%)'
                        }}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none overflow-y-auto">
                        <div
                            className="bg-card w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-border pointer-events-auto my-8 animate-scale-in relative"
                        >
                            {/* Gradient Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl opacity-20 blur-xl animate-gradient-shift" />

                            {/* Modal Content */}
                            <div className="relative bg-card rounded-3xl">
                                {/* Header Image Section */}
                                <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-t-3xl">
                                    {/* Project Image */}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover object-top"
                                    />

                                    {/* Gradients Overlay to darken image for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 mix-blend-multiply" />

                                    {/* Grid Pattern Overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#7EE78708_1px,transparent_1px),linear-gradient(to_bottom,#7EE78708_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />

                                    {/* Project Title Display */}
                                    <div className="absolute inset-0 flex items-end justify-center pb-8">
                                        <div className="text-center px-6">
                                            <h3 className="text-3xl md:text-5xl font-bold text-foreground drop-shadow-2xl">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        onClick={onClose}
                                        className="absolute top-6 right-6 group p-3 rounded-full bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 transition-all hover:scale-110 hover:rotate-90 z-10"
                                    >
                                        <FiX size={20} />
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                                    </button>

                                    {/* Decorative Corner Elements */}
                                    <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent" />
                                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-accent/10 to-transparent" />
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:p-10 space-y-8">
                                    {/* Tech Stack with Enhanced Design */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                                            <FiZap className="w-4 h-4 text-primary" />
                                            Tech Stack
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {project.tech.map((t, index) => (
                                                <span
                                                    key={t}
                                                    className="group relative px-4 py-2 rounded-xl bg-card/50 backdrop-blur-sm text-primary text-sm font-medium border border-border hover:border-primary/50 transition-all hover:scale-105 cursor-default animate-slide-in"
                                                    style={{ animationDelay: `${index * 0.05}s` }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <span className="relative">{t}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                                            <FiCode className="w-4 h-4 text-primary" />
                                            About This Project
                                        </div>
                                        <p className="text-foreground/80 text-lg leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-border" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="px-4 bg-card text-muted-foreground/60 text-xs font-medium">
                                                PROJECT LINKS
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group relative flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-muted-foreground/40 transition-all hover:scale-105 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-border/50 to-border/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <FiGithub className="w-5 h-5 relative z-10 text-muted-foreground group-hover:text-foreground transition-colors" />
                                            <span className="relative z-10 font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                                                View Code
                                            </span>
                                            <div className="absolute inset-0 bg-border/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                                        </a>

                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group relative flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-background font-semibold transition-all hover:scale-105 overflow-hidden shadow-lg shadow-primary/30"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <FiExternalLink className="w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform" />
                                            <span className="relative z-10">Live Demo</span>
                                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
                        @keyframes fade-in {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes scale-in {
                            from { opacity: 0; transform: scale(0.95) translateY(20px); }
                            to { opacity: 1; transform: scale(1) translateY(0); }
                        }
                        @keyframes gradient-shift {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }
                        @keyframes gradient-move {
                            0% { background-position: 0% 0%; }
                            100% { background-position: 100% 100%; }
                        }
                        @keyframes gradient-text {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) scale(1); }
                            50% { transform: translateY(-15px) scale(1.1); }
                        }
                        @keyframes float-delayed {
                            0%, 100% { transform: translateY(0px) scale(1); }
                            50% { transform: translateY(15px) scale(0.9); }
                        }
                        @keyframes pulse-slow {
                            0%, 100% { opacity: 0.3; transform: scale(1); }
                            50% { opacity: 0.5; transform: scale(1.05); }
                        }
                        @keyframes slide-in {
                            from { opacity: 0; transform: translateX(-10px); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                        @keyframes slide-up {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .animate-fade-in {
                            animation: fade-in 0.3s ease-out forwards;
                        }
                        .animate-scale-in {
                            animation: scale-in 0.4s ease-out forwards;
                        }
                        .animate-gradient-shift {
                            background-size: 200% 200%;
                            animation: gradient-shift 8s ease infinite;
                        }
                        .animate-gradient-move {
                            animation: gradient-move 15s linear infinite;
                        }
                        .animate-gradient-text {
                            background-size: 200% 200%;
                            animation: gradient-text 3s ease infinite;
                        }
                        .animate-float {
                            animation: float 6s ease-in-out infinite;
                        }
                        .animate-float-delayed {
                            animation: float-delayed 6s ease-in-out infinite;
                            animation-delay: 1s;
                        }
                        .animate-pulse-slow {
                            animation: pulse-slow 3s ease-in-out infinite;
                        }
                        .animate-slide-in {
                            animation: slide-in 0.4s ease-out forwards;
                            opacity: 0;
                        }
                        .animate-slide-up {
                            animation: slide-up 0.4s ease-out forwards;
                            opacity: 0;
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .animate-fade-in,
                            .animate-scale-in,
                            .animate-gradient-shift,
                            .animate-gradient-move,
                            .animate-gradient-text,
                            .animate-float,
                            .animate-float-delayed,
                            .animate-pulse-slow,
                            .animate-slide-in,
                            .animate-slide-up {
                                animation: none !important;
                                opacity: 1;
                            }
                        }
                    `}</style>
                </>
            )}
        </>
    );
}