"use client";

import { useEffect, useState } from "react";
import { FiGitBranch, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { sections } from "@/data/Sections";
import { useActiveSection } from "@/hooks/Useactivesection";

const STATUS_BAR_HEIGHT = 28; // px

export default function StatusBar() {
    const { activeSection } = useActiveSection(sections.map((s) => s.id));
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const update = () =>
            setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        update();
        const interval = setInterval(update, 30_000);
        return () => clearInterval(interval);
    }, []);

    const current = sections.find((s) => s.id === activeSection);
    const fileLabel = current ? current.file : "index.tsx";
    const langLabel = current ? current.ext.toUpperCase() : "TSX";

    return (
        <div
            className="fixed bottom-0 left-0 right-0 md:left-[296px] z-30 h-7 bg-primary text-background flex items-center justify-between px-4 text-xs font-mono select-none"
            aria-hidden="true"
        >
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                    <FiGitBranch className="w-3.5 h-3.5" />
                    main
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                    <FiRefreshCw className="w-3.5 h-3.5" />
                    up to date
                </span>
            </div>

            <div className="flex items-center gap-4">
                <span className="hidden sm:inline">{fileLabel}</span>
                <span>{langLabel}</span>
                <span className="hidden xs:inline">UTF-8</span>
                <span className="flex items-center gap-1.5">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    {time}
                </span>
            </div>
        </div>
    );
}

export { STATUS_BAR_HEIGHT };