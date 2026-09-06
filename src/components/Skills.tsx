"use client";

import { motion } from "framer-motion";
import skillsData from "@/data/skills.json";
import { FiCode, FiDatabase, FiServer, FiBox } from "react-icons/fi";
import { IconType } from "react-icons";

// Import all icons
import {
    SiHtml5, SiCss3, SiReact, SiNextdotjs, SiJavascript, SiTypescript,
    SiTailwindcss, SiNodedotjs, SiExpress, SiSpringboot, SiMysql,
    SiMongodb, SiPostgresql, SiGit, SiGithub, SiDocker
} from "react-icons/si";
import { FaJava, FaAndroid } from "react-icons/fa";

const iconMap: Record<string, IconType> = {
    SiHtml5, SiCss3, FaJava, SiReact, SiNextdotjs, SiJavascript, SiTypescript,
    SiTailwindcss, SiNodedotjs, SiExpress, SiSpringboot, SiMysql,
    SiMongodb, SiPostgresql, SiGit, FaAndroid, SiGithub, SiDocker
};

type Skill = {
    name: string;
    icon: string | IconType | null;
    category: "frontend" | "backend" | "database" | "tools";
    description?: string;
};

type Category = {
    id: string;
    label: string;
    icon: IconType;
};

export default function Skills() {
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
        { id: "frontend", label: "Frontend", icon: FiCode },
        { id: "backend", label: "Backend", icon: FiServer },
        { id: "database", label: "Database", icon: FiDatabase },
        { id: "tools", label: "Tools", icon: FiBox },
    ];

    return (
        <section id="skills" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <motion.div 
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Skills</span>
                </motion.div>

                {/* Intro text */}
                <motion.p 
                    className="text-lg text-muted-foreground max-w-3xl mb-12 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Technologies I work with—organized by area of focus.
                </motion.p>

                {/* Categories with skills inline */}
                <div className="space-y-12">
                    {categories.map((category, catIndex) => {
                        const categorySkills = skills.filter(s => s.category === category.id);
                        const Icon = category.icon;

                        if (categorySkills.length === 0) return null;

                        return (
                            <motion.div 
                                key={category.id} 
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            >
                                {/* Category header */}
                                <motion.div 
                                    className="flex items-center gap-3"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                    <h3 className="text-sm font-medium text-foreground uppercase tracking-wide">
                                        {category.label}
                                    </h3>
                                </motion.div>

                                {/* Skills list */}
                                <div className="flex flex-wrap gap-2">
                                    {categorySkills.map((skill, skillIndex) => (
                                        <motion.span
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: catIndex * 0.1 + skillIndex * 0.03 }}
                                            whileHover={{ 
                                                scale: 1.05, 
                                                borderColor: "var(--primary)",
                                                color: "var(--foreground)"
                                            }}
                                            className="px-3 py-1.5 text-sm border border-border text-muted-foreground transition-colors cursor-default"
                                        >
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
