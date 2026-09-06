"use client";

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
                <div className="mb-16">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Skills</span>
                </div>

                {/* Intro text */}
                <p className="text-lg text-muted-foreground max-w-3xl mb-12 leading-relaxed">
                    Technologies I work with—organized by area of focus.
                </p>

                {/* Categories with skills inline */}
                <div className="space-y-12">
                    {categories.map((category) => {
                        const categorySkills = skills.filter(s => s.category === category.id);
                        const Icon = category.icon;

                        if (categorySkills.length === 0) return null;

                        return (
                            <div key={category.id} className="space-y-4">
                                {/* Category header */}
                                <div className="flex items-center gap-3">
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                    <h3 className="text-sm font-medium text-foreground uppercase tracking-wide">
                                        {category.label}
                                    </h3>
                                </div>

                                {/* Skills list */}
                                <div className="flex flex-wrap gap-2">
                                    {categorySkills.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="px-3 py-1.5 text-sm border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors cursor-default"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
