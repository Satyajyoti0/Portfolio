"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" ref={ref} className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <motion.div 
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">About</span>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Bio text */}
                    <motion.div 
                        className="lg:col-span-7 space-y-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            Hello! I'm Satyajyoti Mohanty, a Full Stack Developer with a passion for building 
                            beautiful and functional web applications. My journey in software development is 
                            driven by curiosity and a desire to solve real-world problems through code.
                        </p>
                        
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            I enjoy turning complex problems into simple, intuitive designs. When I'm not 
                            pushing pixels, you'll find me exploring new technologies, experimenting with 
                            different frameworks, or diving deep into system architecture.
                        </p>
                        
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            My goal is to build accessible, performant, and scalable applications that 
                            provide genuine value to users. I believe good software should feel invisible—
                            it should enable people to do their best work without getting in the way.
                        </p>

                        {/* Focus areas - simplified */}
                        <motion.div 
                            className="pt-8 flex flex-wrap gap-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {[
                                { title: "Clean Code", desc: "Maintainable, well-structured solutions" },
                                { title: "Performance", desc: "Fast, efficient user experiences" },
                                { title: "User-Centric", desc: "Designed with people in mind" }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                    whileHover={{ x: 4 }}
                                >
                                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Profile image */}
                    <motion.div 
                        className="lg:col-span-5 lg:pl-12"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="relative">
                            <motion.div 
                                className="aspect-[3/4] max-w-md mx-auto bg-card overflow-hidden border border-border"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img
                                    src="/assets/formal.png"
                                    alt="Satyajyoti Mohanty"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </motion.div>
                            
                            {/* Simple caption */}
                            <motion.p 
                                className="text-center text-sm text-muted-foreground mt-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                Satyajyoti Mohanty
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
