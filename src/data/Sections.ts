import { IconType } from "react-icons";
import { FiCode, FiFileText, FiTerminal } from "react-icons/fi";

export type FileExt = "tsx" | "json" | "md" | "log";

export type PortfolioSection = {
    id: string;
    file: string;
    label: string;
    ext: FileExt;
};

/**
 * Single source of truth for site navigation. Mirrors the original
 * navLinks array from Navbar.tsx — same sections, same order — just
 * enriched with a "filename" and extension so the IDE-style chrome
 * (Sidebar file tree, TabBar tabs, StatusBar language mode,
 * CommandPalette results) all read from one list instead of drifting
 * out of sync with each other.
 */
export const sections: PortfolioSection[] = [
    { id: "about", file: "about.tsx", label: "About", ext: "tsx" },
    { id: "skills", file: "skills.json", label: "Skills", ext: "json" },
    { id: "certifications", file: "certifications.md", label: "Certifications", ext: "md" },
    { id: "projects", file: "projects.tsx", label: "Projects", ext: "tsx" },
    { id: "experience", file: "experience.log", label: "Experience", ext: "log" },
    { id: "contact", file: "contact.tsx", label: "Contact", ext: "tsx" },
];

export const sectionIds = sections.map((s) => s.id);

/** File-type icon, VS Code style (icon shape varies by extension). */
export const extIcon: Record<FileExt, IconType> = {
    tsx: FiCode,
    json: FiCode,
    md: FiFileText,
    log: FiTerminal,
};

/**
 * File-type color, VS Code style (color varies by language).
 * Deliberately reuses the site's existing tokens so this reads as
 * "our palette, applied to a real convention" rather than new colors.
 */
export const extColorClass: Record<FileExt, string> = {
    tsx: "text-primary",
    json: "text-secondary",
    md: "text-accent",
    log: "text-muted-foreground",
};