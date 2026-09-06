"use client";

import { motion } from "framer-motion";
import experienceData from "@/data/experience.json";

export default function Experience() {
    return (
        <section id="experience" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <motion.div 
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Experience</span>
                </motion.div>

                {/* Experience entries */}
                <div className="max-w-3xl space-y-12">
                    {experienceData.map((exp, index) => (
                        <motion.div 
                            key={exp.id} 
                            className="group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ x: 8 }}
                        >
                            {/* Period */}
                            <motion.div 
                                className="text-xs font-mono text-muted-foreground mb-2 flex items-center gap-3"
                                whileHover={{ x: 4 }}
                            >
                                <span className="w-2 h-px bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                {exp.period}
                            </motion.div>

                            {/* Role & Company */}
                            <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                                {exp.role}
                            </h3>
                            
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                <span>{exp.company}</span>
                                <span className="w-1 h-1 bg-border rounded-full"></span>
                                <span>{exp.location}</span>
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed">
                                {exp.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
