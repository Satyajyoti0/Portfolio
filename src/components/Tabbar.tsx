"use client";

import { sections, extIcon, extColorClass } from "@/data/Sections";
import { useActiveSection, scrollToSection } from "@/hooks/Useactivesection";

const TAB_BAR_HEIGHT = 56; // px — sections should add scroll-mt-14 so #anchors land below this

export default function TabBar() {
    const { activeSection } = useActiveSection(sections.map((s) => s.id));
    const isHome = !activeSection;

    return (
        <div
            className="fixed top-0 left-0 right-0 md:left-[296px] z-30 h-14 bg-card/90 backdrop-blur-xl border-b border-border overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Section tabs"
        >
            <div className="flex items-stretch h-full pl-16 md:pl-0 min-w-max">
                {/* Home / index tab */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    role="tab"
                    aria-selected={isHome}
                    className={`group relative flex items-center gap-2 px-5 text-sm font-medium border-r border-border transition-colors ${isHome ? "text-foreground bg-background" : "text-muted-foreground hover:text-foreground bg-card/50"
                        }`}
                >
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    index.tsx
                    {isHome && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary" />}
                </button>

                {sections.map((section) => {
                    const Icon = extIcon[section.ext];
                    const isActive = activeSection === section.id;
                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            role="tab"
                            aria-selected={isActive}
                            className={`group relative flex items-center gap-2 px-5 text-sm font-medium border-r border-border transition-colors whitespace-nowrap ${isActive ? "text-foreground bg-background" : "text-muted-foreground hover:text-foreground bg-card/50"
                                }`}
                        >
                            <Icon className={`w-4 h-4 shrink-0 ${extColorClass[section.ext]}`} />
                            {section.file}
                            {isActive && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary" />}
                        </button>
                    );
                })}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}

export { TAB_BAR_HEIGHT };