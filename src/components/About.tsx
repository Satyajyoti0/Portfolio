"use client";

export default function About() {
    return (
        <section id="about" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <div className="mb-16">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">About</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Bio text */}
                    <div className="lg:col-span-7 space-y-8">
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
                        <div className="pt-8 flex flex-wrap gap-8">
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Clean Code</h3>
                                <p className="text-sm text-muted-foreground">Maintainable, well-structured solutions</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Performance</h3>
                                <p className="text-sm text-muted-foreground">Fast, efficient user experiences</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">User-Centric</h3>
                                <p className="text-sm text-muted-foreground">Designed with people in mind</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Profile image */}
                    <div className="lg:col-span-5 lg:pl-12">
                        <div className="relative">
                            <div className="aspect-[3/4] max-w-md mx-auto bg-card overflow-hidden border border-border">
                                <img
                                    src="/assets/formal.png"
                                    alt="Satyajyoti Mohanty"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            
                            {/* Simple caption */}
                            <p className="text-center text-sm text-muted-foreground mt-4">
                                Satyajyoti Mohanty
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
