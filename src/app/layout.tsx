import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar, { SIDEBAR_WIDTH } from "@/components/Sidebar";
import TabBar from "@/components/Tabbar";
import StatusBar from "@/components/Statusbar";
import CommandPalette from "@/components/Commandpalette";
import Footer from "@/components/Footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Full Stack Developer",
  description: "A showcase of my work and skills as a Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Sidebar />
        <TabBar />
        <CommandPalette />

        {/* Offset for the fixed sidebar (desktop), tab bar (top), and status bar (bottom) */}
        <div className="md:pl-[296px] pt-14 pb-7">
          <main>{children}</main>
          <Footer />
        </div>

        <StatusBar />
        <Analytics />
      </body>
    </html>
  );
}