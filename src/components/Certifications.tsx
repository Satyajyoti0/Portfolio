"use client";

import { motion } from "framer-motion";
import certificationsData from "@/data/certifications.json";
import { FiExternalLink } from "react-icons/fi";

export default function Certifications() {
    return (
        <section id="certifications" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <motion.div 
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Certifications</span>
                </motion.div>

                {/* Certifications list - editorial style */}
                <div className="space-y-6 max-w-3xl">
                    {certificationsData.map((cert, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ x: 4, borderColor: "var(--border)" }}
                            className="group p-6 border border-border hover:border-foreground/50 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {cert.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {cert.issuer} · {cert.date}
                                    </p>
                                    
                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2">
                                        {cert.skills.map((skill, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 + i * 0.05 }}
                                                whileHover={{ scale: 1.05 }}
                                                className="px-2 py-0.5 text-xs text-muted-foreground cursor-default"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Link */}
                                <motion.a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={`View ${cert.name} credential`}
                                >
                                    <FiExternalLink className="w-4 h-4" />
                                </motion.a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
