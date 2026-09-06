import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Name */}
                    <div className="text-center md:text-left">
                        <p className="text-sm font-medium text-foreground">Satyajyoti Mohanty</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            &copy; {currentYear} All rights reserved.
                        </p>
                    </div>

                    {/* Right: Social links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/Zenus004"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <FiGithub className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/satyajyoti-mohanty-716674266"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
