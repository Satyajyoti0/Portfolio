"use client";

import certificationsData from "@/data/certifications.json";
import { FiExternalLink } from "react-icons/fi";

export default function Certifications() {
    return (
        <section id="certifications" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <div className="mb-16">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Certifications</span>
                </div>

                {/* Certifications list - editorial style */}
                <div className="space-y-6 max-w-3xl">
                    {certificationsData.map((cert, index) => (
                        <article
                            key={index}
                            className="group p-6 border border-border hover:border-foreground transition-colors"
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
                                            <span
                                                key={i}
                                                className="px-2 py-0.5 text-xs text-muted-foreground"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Link */}
                                <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={`View ${cert.name} credential`}
                                >
                                    <FiExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
