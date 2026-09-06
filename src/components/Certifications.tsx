"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiExternalLink, FiCalendar } from "react-icons/fi";
import certificationsData from "@/data/certifications.json";

export default function Certifications() {
    return (
        <section id="certifications" className="scroll-mt-14 relative py-8 bg-background overflow-hidden">
            {/* Background Elements (Hidden on mobile to prevent render crash) */}
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
            <div className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,#7EE78708_1px,transparent_1px),linear-gradient(to_bottom,#7EE78708_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Floating Orbs */}
            <div className="hidden md:block absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="hidden md:block absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow-delayed" />


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-mono border border-accent/20">
                            $ git log --certs
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-foreground">Professional</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
                            Certifications
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Validating expertise through industry-recognized qualifications
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificationsData.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative h-full p-8 bg-card/50 rounded-2xl border border-border hover:border-accent/30 transition-all duration-300 overflow-hidden">

                                {/* Hover Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon / Top Section */}
                                <div className="flex items-start justify-between mb-6 relative z-10">
                                    <div className="bg-card/50 rounded-xl border border-border group-hover:scale-110 transition-transform duration-300 w-14 h-14 flex items-center justify-center overflow-hidden relative">
                                        {cert.image ? (
                                            <img
                                                src={cert.image}
                                                alt={cert.issuer}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FiAward className="w-8 h-8 text-accent" />
                                        )}
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-card/50 border border-border text-xs text-muted-foreground flex items-center gap-1.5">
                                        <FiCalendar className="w-3 h-3" />
                                        {cert.date}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                                        {cert.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-6 font-medium">
                                        {cert.issuer}
                                    </p>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {cert.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs rounded-md bg-card/50 text-muted-foreground border border-border/50"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Link */}
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-secondary font-medium transition-colors group-hover:translate-x-1 duration-300"
                                    >
                                        Show Credential
                                        <FiExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(20px) rotate(-5deg); }
                }
                .animate-float { animation: float 8s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; animation-delay: 2s; }

                @media (prefers-reduced-motion: reduce) {
                    .animate-float,
                    .animate-float-delayed {
                        animation: none !important;
                    }
                }
            `}</style>
        </section>
    );
}