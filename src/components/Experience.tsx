"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import experienceData from "@/data/experience.json";
import { FiBriefcase, FiCalendar, FiMapPin, FiTrendingUp } from "react-icons/fi";

export default function Experience() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="experience" className="scroll-mt-14 relative py-8 bg-background overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#7EE78708_1px,transparent_1px),linear-gradient(to_bottom,#7EE78708_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Floating Orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-mono border border-primary/20 flex items-center gap-2 mx-auto w-fit">
                            <FiBriefcase className="w-4 h-4" />
                            $ cat career.log
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-foreground">Work</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Experience
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent opacity-50 blur-sm" />
                    </div>

                    {experienceData.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`relative mb-16 md:mb-20 flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Dot with Glow */}
                            <div className="absolute left-[-6px] md:left-1/2 transform md:-translate-x-1/2 top-6 z-20">
                                <div className="relative">
                                    {/* Outer Glow Ring */}
                                    <div
                                        className={`absolute inset-0 w-6 h-6 -translate-x-1.5 -translate-y-1.5 bg-gradient-to-r from-primary to-secondary rounded-full blur-md transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100 scale-150" : "opacity-50"
                                            }`}
                                    />

                                    {/* Middle Ring */}
                                    <div
                                        className={`absolute w-5 h-5 -translate-x-1 -translate-y-1 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ${hoveredIndex === index ? "scale-125" : "scale-100"
                                            }`}
                                    />

                                    {/* Inner Dot */}
                                    <div className="w-3 h-3 bg-foreground rounded-full border-2 border-background relative z-10" />

                                    {/* Pulse Animation */}
                                    {hoveredIndex === index && (
                                        <div className="absolute inset-0 w-6 h-6 -translate-x-1.5 -translate-y-1.5 bg-primary rounded-full animate-ping opacity-75" />
                                    )}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
                                <div
                                    className={`group relative bg-card/50 p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                        } ${hoveredIndex === index ? "scale-105 shadow-2xl shadow-primary/20" : ""}`}
                                >
                                    {/* Gradient Background on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Corner Accent */}
                                    <div className={`absolute top-0 ${index % 2 === 0 ? "left-0" : "right-0"} w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent`} />

                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Period Badge */}
                                        <div
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-xs font-semibold mb-4 border border-primary/20 ${index % 2 === 0 ? "" : "md:float-right md:ml-4"
                                                }`}
                                        >
                                            <FiCalendar className="w-3 h-3" />
                                            {exp.period}
                                        </div>

                                        {/* Role */}
                                        <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                                            {exp.role}
                                        </h3>

                                        {/* Company */}
                                        <div className="flex items-center gap-2 mb-2 text-muted-foreground font-semibold">
                                            {index % 2 === 0 ? (
                                                <>
                                                    <FiBriefcase className="w-4 h-4 text-primary" />
                                                    <h4>{exp.company}</h4>
                                                </>
                                            ) : (
                                                <>
                                                    <h4 className="md:text-right flex-1">{exp.company}</h4>
                                                    <FiBriefcase className="w-4 h-4 text-primary" />
                                                </>
                                            )}
                                        </div>

                                        {/* Location */}
                                        <div className={`flex items-center gap-2 mb-6 text-muted-foreground/70 text-sm ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                                            {index % 2 === 0 ? (
                                                <>
                                                    <FiMapPin className="w-3 h-3" />
                                                    <span>{exp.location}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{exp.location}</span>
                                                    <FiMapPin className="w-3 h-3" />
                                                </>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                                        {/* Decorative Arrow */}
                                        <div
                                            className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? "left-0 -translate-x-full md:-translate-x-8" : "right-0 translate-x-full md:translate-x-8"
                                                } hidden md:block opacity-0 group-hover:opacity-100 transition-opacity`}
                                        >
                                            <div className="w-6 h-px bg-gradient-to-r from-primary to-secondary" />
                                        </div>
                                    </div>

                                    {/* Bottom Glow */}
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

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
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
          animation: fade-in-up 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-float-delayed,
          .animate-fade-in-up,
          .animate-fade-in-up-delayed,
          .animate-slide-in {
            animation: none !important;
            opacity: 1;
          }
        }
      `}</style>
        </section>
    );
}