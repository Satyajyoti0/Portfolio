"use client";

import { useState, useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center gap-2 text-primary font-mono text-sm animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            loading scene...
        </div>
    )
});

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering] = useState(false);
    const [isSplineVisible, setIsSplineVisible] = useState(true);
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsSplineVisible(entry.isIntersecting),
            { rootMargin: "200px" }
        );

        if (heroRef.current) observer.observe(heroRef.current);

        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth < 768) return;
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-16 lg:py-0">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#7EE78710_1px,transparent_1px),linear-gradient(to_bottom,#7EE78710_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

            {/* Floating Orbs with Parallax — syntax-inspired palette */}
            <div
                className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }}
            />
            <div
                className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed"
                style={{
                    transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
                }}
            />
            <div
                className="hidden md:block absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/15 rounded-full blur-3xl animate-pulse"
                style={{
                    transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                }}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-16 lg:mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Left Column: Text Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1 pt-4 lg:pt-0">
                        {/* Status Badge — terminal style */}
                        <div className="inline-block relative mb-8 animate-fade-in">
                            <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-20 animate-pulse" />
                            <span className="relative inline-flex items-center gap-2 py-2 px-4 rounded-md bg-card/80 backdrop-blur-sm text-primary text-sm font-mono border border-primary/30">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                $ status --available
                            </span>
                        </div>

                        {/* Main Heading with Gradient Animation */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up leading-tight">
                            <span className="block text-foreground mb-2">Building Digital</span>
                            <span className="relative inline-block">
                                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-2xl opacity-30 animate-gradient-shift" />
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-text">
                                    Experiences
                                </span>
                                <span className="relative inline-block w-[5px] h-[0.85em] ml-1 bg-primary align-middle animate-blink" />
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-in-up-delayed">
                            Full Stack Developer specializing in building exceptional digital experiences.
                            <br />
                            <span className="text-primary font-medium">Creating accessible, human-centered products.</span>
                        </p>

                        {/* CTA Buttons with Hover Effects — using anchors */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4 lg:mb-16 animate-fade-in-up-more-delayed">
                            <a
                                href="#projects"
                                className="group relative px-8 py-4 w-full sm:w-auto text-center rounded-md bg-gradient-to-r from-primary to-secondary text-background font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                aria-label="View Projects"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center justify-center gap-2">
                                    View Projects
                                    <FiArrowRight className={`transition-transform ${isHovering ? 'translate-x-1' : ''}`} />
                                </span>
                            </a>

                            <a
                                href="#contact"
                                className="group px-8 py-4 w-full sm:w-auto text-center rounded-md bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 text-foreground font-medium transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                aria-label="Contact Me"
                            >
                                Contact Me
                                <span className="font-mono text-accent group-hover:translate-x-0.5 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: 3D Spline Asset in an editor-window frame */}
                    <div className="w-full h-[400px] sm:h-[450px] lg:h-[600px] relative animate-fade-in-up-delayed order-1 lg:order-2 mb-8 lg:mb-0">
                        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-[100px] animate-pulse" />

                        <div className="relative w-full h-full rounded-2xl border border-border bg-background/60 overflow-hidden shadow-2xl shadow-black/50 flex flex-col">
                            {/* Window chrome bar */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/80 shrink-0">
                                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                <span className="ml-3 text-xs font-mono text-muted-foreground">hero-scene.tsx</span>
                            </div>

                            <div className="relative flex-1 overflow-hidden flex items-center justify-center pointer-events-none">
                                <div className="md:hidden absolute inset-0 z-50 pointer-events-auto"></div>
                                {isSplineVisible && (
                                    <div className="absolute w-[calc(100%+300px)] h-[calc(100%+100px)] -top-[50px] -left-[150px] pointer-events-auto">
                                        <Spline scene="https://prod.spline.design/HScvuQcrBo6Lig1r/scene.splinecode" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <div className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
                <div className="relative w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-primary rounded-full animate-scroll-indicator" />
                </div>
            </div>

            <style jsx>{`

                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                }
                @keyframes gradient-shift {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.2) rotate(180deg); }
                }
                @keyframes gradient-text {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scroll-indicator {
                    0% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(10px); }
                }
                @keyframes blink {
                    0%, 45% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite;
                    animation-delay: 1s;
                }
                .animate-gradient-shift {
                    animation: gradient-shift 8s ease-in-out infinite;
                    background-size: 200% 200%;
                }
                .animate-gradient-text {
                    animation: gradient-text 3s ease-in-out infinite;
                    background-size: 200% 200%;
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fade-in 0.8s ease-out 0.2s forwards;
                    opacity: 0;
                }
                .animate-fade-in-up-delayed {
                    animation: fade-in 0.8s ease-out 0.4s forwards;
                    opacity: 0;
                }
                .animate-fade-in-up-more-delayed {
                    animation: fade-in 0.8s ease-out 0.6s forwards;
                    opacity: 0;
                }
                .animate-fade-in-up-final {
                    animation: fade-in 0.8s ease-out 0.8s forwards;
                    opacity: 0;
                }
                .animate-bounce-slow {
                    animation: bounce 2s ease-in-out infinite;
                }
                .animate-scroll-indicator {
                    animation: scroll-indicator 1.5s ease-in-out infinite;
                }
                .animate-blink {
                    animation: blink 1.1s step-end infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .animate-float,
                    .animate-float-delayed,
                    .animate-gradient-shift,
                    .animate-gradient-text,
                    .animate-fade-in,
                    .animate-fade-in-up,
                    .animate-fade-in-up-delayed,
                    .animate-fade-in-up-more-delayed,
                    .animate-fade-in-up-final,
                    .animate-bounce-slow,
                    .animate-scroll-indicator,
                    .animate-blink {
                        animation: none !important;
                        opacity: 1;
                    }
                }
            `}</style>
        </section>
    );
}