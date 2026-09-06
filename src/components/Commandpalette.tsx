"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiGithub, FiLinkedin, FiMail, FiArrowUp, FiCornerDownLeft } from "react-icons/fi";
import { sections, extIcon, extColorClass } from "@/data/Sections";
import { scrollToSection } from "@/hooks/Useactivesection";

type Command = {
    id: string;
    label: string;
    hint: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClassName?: string;
    action: () => void;
};

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlighted, setHighlighted] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: Command[] = useMemo(
        () => [
            ...sections.map((section) => ({
                id: `nav-${section.id}`,
                label: `Go to ${section.label}`,
                hint: section.file,
                icon: extIcon[section.ext],
                iconClassName: extColorClass[section.ext],
                action: () => scrollToSection(section.id),
            })),
            {
                id: "scroll-top",
                label: "Go to top",
                hint: "index.tsx",
                icon: FiArrowUp,
                iconClassName: "text-primary",
                action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            },
            {
                id: "github",
                label: "Open GitHub profile",
                hint: "external",
                icon: FiGithub,
                iconClassName: "text-primary",
                action: () => window.open("https://github.com/Zenus004", "_blank", "noreferrer"),
            },
            {
                id: "linkedin",
                label: "Open LinkedIn profile",
                hint: "external",
                icon: FiLinkedin,
                iconClassName: "text-accent",
                action: () => window.open("https://www.linkedin.com/in/satyajyoti-mohanty-716674266", "_blank", "noreferrer"),
            },
            {
                id: "email",
                label: "Email Satyajyoti",
                hint: "mailto",
                icon: FiMail,
                iconClassName: "text-secondary",
                action: () => window.open("mailto:satyajyoti05@gmail.com"),
            },
        ],
        []
    );

    const filtered = useMemo(() => {
        if (!query.trim()) return commands;
        const q = query.toLowerCase();
        return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
    }, [commands, query]);

    const close = () => {
        setOpen(false);
        setQuery("");
        setHighlighted(0);
    };

    const runCommand = (command: Command) => {
        command.action();
        close();
    };

    useEffect(() => {
        const openHandler = () => setOpen(true);
        window.addEventListener("open-command-palette", openHandler);

        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            } else if (e.key === "Escape") {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("open-command-palette", openHandler);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 20);
        }
    }, [open]);

    useEffect(() => {
        setHighlighted(0);
    }, [query]);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlighted((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const command = filtered[highlighted];
            if (command) runCommand(command);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-xl z-[70] px-4"
                        role="dialog"
                        aria-label="Command palette"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-3 px-4 h-14 border-b border-border">
                                <FiSearch className="w-4 h-4 text-muted-foreground shrink-0" />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleInputKeyDown}
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground/60"
                                />
                                <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground font-mono">
                                    esc
                                </kbd>
                            </div>

                            <div className="max-h-80 overflow-y-auto py-2">
                                {filtered.length === 0 && (
                                    <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                                        No matching commands
                                    </div>
                                )}
                                {filtered.map((command, index) => {
                                    const Icon = command.icon;
                                    const isHighlighted = index === highlighted;
                                    return (
                                        <button
                                            key={command.id}
                                            onMouseEnter={() => setHighlighted(index)}
                                            onClick={() => runCommand(command)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${isHighlighted ? "bg-primary/10 text-foreground" : "text-muted-foreground"
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 shrink-0 ${command.iconClassName ?? ""}`} />
                                            <span className="flex-1">{command.label}</span>
                                            <span className="text-xs text-muted-foreground/60 font-mono">{command.hint}</span>
                                            {isHighlighted && <FiCornerDownLeft className="w-3.5 h-3.5 text-primary shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}