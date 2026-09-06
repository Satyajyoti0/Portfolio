"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view and whether the page has scrolled
 * past the top. Shared by Sidebar, TabBar, and StatusBar so we only attach
 * ONE scroll listener instead of one per component.
 *
 * Detection algorithm is unchanged from the original Navbar implementation —
 * just parameterized so multiple components can reuse it.
 */
export function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState<string>("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let scrollFrame: number;
        const handleScroll = () => {
            cancelAnimationFrame(scrollFrame);
            scrollFrame = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 20);
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    // If multiple are visible, pick the first one
                    setActiveSection(visibleEntries[0].target.id);
                }
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(scrollFrame);
            observer.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { activeSection, scrolled };
}

/** Smooth-scrolls to a section, matching the original mobile-menu behavior. */
export function scrollToSection(id: string, delay = 0) {
    const go = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (delay > 0) {
        setTimeout(go, delay);
    } else {
        go();
    }
}