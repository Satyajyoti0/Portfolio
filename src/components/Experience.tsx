"use client";

import experienceData from "@/data/experience.json";

export default function Experience() {
    return (
        <section id="experience" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <div className="mb-16">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Experience</span>
                </div>

                {/* Experience entries */}
                <div className="max-w-3xl space-y-12">
                    {experienceData.map((exp) => (
                        <div key={exp.id} className="group">
                            {/* Period */}
                            <div className="text-xs font-mono text-muted-foreground mb-2">
                                {exp.period}
                            </div>

                            {/* Role & Company */}
                            <h3 className="text-xl font-semibold text-foreground mb-1">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
