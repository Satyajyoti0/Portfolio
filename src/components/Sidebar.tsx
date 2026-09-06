"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FiFolder,
    FiChevronDown,
    FiSearch,
    FiGitBranch,
    FiMail,
    FiMenu,
    FiX,
    FiGithub, 
    FiLinkedin
} from "react-icons/fi";
import { sections, extIcon, extColorClass } from "@/data/Sections";
import { useActiveSection, scrollToSection } from "@/hooks/Useactivesection";

const SIDEBAR_WIDTH = 296; // 56px activity bar + 240px explorer — used by the shell for content offset

function ExplorerPanel({ onNavigate }: { onNavigate: (id: string) => void }) {
    const { activeSection } = useActiveSection(sections.map((s) => s.id));
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="flex flex-col h-full w-60 bg-card/60 border-r border-border">
            {/* Brand row */}
            <div className="flex items-center gap-3 px-4 h-20 border-b border-border">
                <div className="relative w-9 h-9 min-w-[36px] rounded-lg overflow-hidden border border-border shadow-lg shadow-primary/20">
                    <img src="/assets/logo.png" alt="SatyaJyoti Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-sm font-bold tracking-tight leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Satya</span>
                    <span className="text-foreground">jyoti</span>
                </div>
            </div>

            {/* Workspace folder header */}
            <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-3 text-xs font-semibold tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "" : "-rotate-90"}`} />
                Portfolio
            </button>

            {/* File tree */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4">
                            {sections.map((section) => {
                                const Icon = extIcon[section.ext];
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => onNavigate(section.id)}
                                        className={`group relative flex items-center gap-2.5 w-full pl-8 pr-3 py-2 text-sm transition-colors ${isActive
                                            ? "bg-primary/10 text-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-card"
                                            }`}
                                    >
                                        {isActive && (
                                            <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                                        )}
                                        <Icon className={`w-4 h-4 shrink-0 ${extColorClass[section.ext]}`} />
                                        <span className="truncate">{section.file}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer: git branch hint */}
            <div className="mt-auto flex items-center gap-2 px-4 py-3 border-t border-border text-xs text-muted-foreground">
                <FiGitBranch className="w-3.5 h-3.5" />
                main
            </div>
        </div>
    );
}

function ActivityBar() {
    return (
        <div className="flex flex-col items-center w-14 h-full bg-background border-r border-border py-4 gap-1">
            <div
                className="relative p-3 rounded-lg text-primary bg-primary/10 cursor-default"
                aria-label="Explorer"
                title="Explorer"
            >
                <FiFolder className="w-5 h-5" />
                <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-primary rounded-full" />
            </div>

            <button
                onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
                className="p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                aria-label="Search (Cmd+K)"
                title="Search (Cmd+K)"
            >
                <FiSearch className="w-5 h-5" />
            </button>

            <a
                href="https://github.com/Zenus004"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-colors"
                aria-label="GitHub"
                title="Source Control — GitHub"
            >
                <FiGithub className="w-5 h-5" />
            </a>

            <a
                href="https://www.linkedin.com/in/satyajyoti-mohanty-716674266"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg text-muted-foreground hover:text-accent hover:bg-card transition-colors"
                aria-label="LinkedIn"
                title="Account — LinkedIn"
            >
                <FiLinkedin className="w-5 h-5 rotate-0" />
            </a>

            <button
                onClick={() => scrollToSection("contact")}
                className="mt-auto p-3 rounded-lg text-muted-foreground hover:text-secondary hover:bg-card transition-colors"
                aria-label="Contact"
                title="Contact"
            >
                <FiMail className="w-5 h-5" />
            </button>
        </div>
    );
}

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavigate = (id: string) => {
        setMobileOpen(false);
        scrollToSection(id, 80);
    };

    return (
        <>
            {/* Desktop sidebar */}
            <aside
                className="hidden md:flex fixed top-0 left-0 bottom-0 z-40"
                style={{ width: SIDEBAR_WIDTH }}
                aria-label="Primary navigation"
            >
                <ActivityBar />
                <ExplorerPanel onNavigate={handleNavigate} />
            </aside>

            {/* Mobile trigger */}
            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-[6px] left-4 z-40 p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border text-foreground shadow-lg"
                aria-label="Open navigation"
            >
                <FiMenu className="w-5 h-5" />
            </button>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="md:hidden fixed top-0 left-0 bottom-0 z-50 flex"
                        >
                            <ActivityBar />
                            <ExplorerPanel onNavigate={handleNavigate} />
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="absolute top-4 -right-12 p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border text-foreground"
                                aria-label="Close navigation"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export { SIDEBAR_WIDTH };