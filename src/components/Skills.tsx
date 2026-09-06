"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    SiHtml5, SiCss3, SiReact, SiNextdotjs, SiJavascript, SiTypescript,
    SiTailwindcss, SiNodedotjs, SiExpress, SiSpringboot, SiMysql,
    SiMongodb, SiPostgresql, SiGit, SiGithub, SiDocker
} from "react-icons/si";
import { FaJava, FaAndroid } from "react-icons/fa";
import skillsData from "@/data/skills.json";

import {
    FiCode,
    FiDatabase,
    FiGitBranch,
    FiLayers,
    FiServer,
    FiBox,
} from "react-icons/fi";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
    SiHtml5, SiCss3, FaJava, SiReact, SiNextdotjs, SiJavascript, SiTypescript,
    SiTailwindcss, SiNodedotjs, SiExpress, SiSpringboot, SiMysql,
    SiMongodb, SiPostgresql, SiGit, FaAndroid, SiGithub, SiDocker
};

type Skill = {
    name: string;
    level: number;
    icon: string | IconType | null;
    color: string;
    category: "frontend" | "backend" | "database" | "tools";
    description?: string;
};

type Category = {
    id: string;
    label: string;
    icon: IconType;
};

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const resolveIcon = (name?: string) => {
        return name ? (iconMap[name] || null) : null;
    };

    const allowedCategories = new Set<Skill['category']>([
        "frontend",
        "backend",
        "database",
        "tools",
    ]);

    const skills: Skill[] = skillsData.map((skill: any) => {
        const resolvedIcon = resolveIcon(skill.icon as string);
        const rawCategory = skill.category as string;

        const category = allowedCategories.has(rawCategory as Skill['category'])
            ? (rawCategory as Skill['category'])
            : "frontend";

        return {
            ...skill,
            icon: resolvedIcon,
            category,
        } as Skill;
    });

    const categories: Category[] = [
        { id: "all", label: "All Skills", icon: FiLayers },
        { id: "frontend", label: "Frontend", icon: FiCode },
        { id: "backend", label: "Backend", icon: FiServer },
        { id: "database", label: "Database", icon: FiDatabase },
        { id: "tools", label: "Tools & IDE", icon: FiBox },
    ];

    const filteredSkills =
        activeCategory === "all"
            ? skills
            : skills.filter((skill) => skill.category === activeCategory);

    const getLevelBadge = (level: number) => {
        if (level >= 80)
            return {
                label: "Expert",
                color: "text-primary bg-primary/10 border-primary/30",
            };
        if (level >= 60)
            return {
                label: "Advanced",
                color: "text-secondary bg-secondary/10 border-secondary/30",
            };
        if (level >= 40)
            return {
                label: "Intermediate",
                color: "text-accent bg-accent/10 border-accent/30",
            };
        return {
            label: "Beginner",
            color: "text-muted-foreground bg-muted-foreground/10 border-muted-foreground/30",
        };
    };

    return (
        <section id="skills" className="scroll-mt-14 relative py-8 bg-background overflow-hidden">
            {/* Background Elements (Hidden on mobile to prevent render crash) */}
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
            <div className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,#7EE78708_1px,transparent_1px),linear-gradient(to_bottom,#7EE78708_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Floating Orbs */}
            <div className="hidden md:block absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
            <div className="hidden md:block absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header (FRAMER MOTION) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-mono border border-primary/20">
                            $ ls ./skills
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-foreground">Technical</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Skills
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
                        A comprehensive toolkit of modern technologies and frameworks
                    </p>
                </motion.div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up-delayed">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeCategory === category.id
                                ? "bg-gradient-to-r from-primary to-secondary text-background shadow-lg shadow-primary/30 scale-105"
                                : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card border border-border"
                                }`}
                        >
                            <category.icon className="w-4 h-4" />
                            {category.label}
                            {activeCategory === category.id && (
                                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-xl opacity-50 -z-10" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Skills Grid (cards animated with Framer Motion) */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredSkills.map((skill, index) => {
                        const levelBadge = getLevelBadge(skill.level);
                        const Icon = (skill.icon as IconType) ?? FiCode; // fallback

                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "50px" }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                                className="group relative"
                            >
                                <div className="relative h-full p-6 bg-card/50 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 overflow-hidden">
                                    {/* Gradient Background on Hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                    />

                                    <div
                                        className={`hidden md:block absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon Container */}
                                        <div className="mb-4">
                                            <div
                                                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${skill.color} shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                                            >
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Skill Name */}
                                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
                                            {skill.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                            {skill.description}
                                        </p>

                                        {/* Level Badge and Percentage */}
                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelBadge.color}`}
                                            >
                                                {levelBadge.label}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-1.5 h-6 rounded-full transition-all duration-300 ${i < Math.ceil(skill.level / 20)
                                                                ? `bg-gradient-to-t ${skill.color}`
                                                                : "bg-border"
                                                                }`}
                                                            style={{
                                                                animationDelay: `${i * 0.1}s`,
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-muted-foreground text-sm font-mono font-semibold">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Corner Accent */}
                                    <div
                                        className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${skill.color} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            {/* Bottom Stats */}
            {/* <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up-final">
                    {[
                        { label: "Technologies", value: skills.length, icon: FiCode },
                        { label: "Years Experience", value: "5+", icon: FiLayers },
                        { label: "Projects Built", value: "50+", icon: FiBox },
                        { label: "Certifications", value: "8+", icon: FiGitBranch },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="relative p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <stat.icon className="w-8 h-8 text-purple-400 mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-slate-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div> */}
            <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-5deg);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
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
          animation: scale-in 0.5s ease-out forwards;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-float-delayed,
          .animate-fade-in-up,
          .animate-fade-in-up-delayed,
          .animate-fade-in-up-final,
          .animate-scale-in {
            animation: none !important;
            opacity: 1;
          }
        }
      `}</style>
        </section>
    );
}