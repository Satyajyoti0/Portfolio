"use client";

import { FiCode, FiZap, FiHeart } from "react-icons/fi";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

type ValueColor = "primary" | "secondary" | "accent";

type ValueCard = {
  icon: IconType;
  label: string;
  color: ValueColor;
};

const valueCards: ValueCard[] = [
  { icon: FiCode, label: "Clean Code", color: "primary" },
  { icon: FiZap, label: "Performance", color: "secondary" },
  { icon: FiHeart, label: "User-Centric", color: "accent" },
];

const colorMap: Record<
  ValueColor,
  { gradient: string; icon: string; bgHover: string }
> = {
  primary: {
    gradient: "from-primary/10 to-transparent",
    icon: "text-primary",
    bgHover: "bg-primary/20",
  },
  secondary: {
    gradient: "from-secondary/10 to-transparent",
    icon: "text-secondary",
    bgHover: "bg-secondary/20",
  },
  accent: {
    gradient: "from-accent/10 to-transparent",
    icon: "text-accent",
    bgHover: "bg-accent/20",
  },
};

export default function About() {
  return (
    <section id="about" className="scroll-mt-14 relative py-8 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#7EE78708_1px,transparent_1px),linear-gradient(to_bottom,#7EE78708_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="hidden md:block absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Wrap main content in motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-mono border border-primary/20">
                $ whoami
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-foreground">About</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Column - Text Content */}
            <div className="space-y-6 animate-slide-in-left">
              <div className="space-y-6">
                <p className="text-foreground/80 text-lg leading-relaxed">
                  Hello! I'm Satyajyoti Mohanty a{" "}
                  <span className="text-primary font-semibold">
                    passionate Full Stack Developer
                  </span>{" "}
                  with a knack for creating beautiful and functional web
                  applications.
                </p>
                <p className="text-foreground/80 text-lg leading-relaxed">
                  I enjoy turning complex problems into{" "}
                  <span className="text-secondary font-semibold">
                    simple, beautiful and intuitive designs
                  </span>
                  . When I'm not pushing pixels, you'll find me exploring new
                  technologies.
                </p>
                <p className="text-foreground/80 text-lg leading-relaxed">
                  My goal is to build{" "}
                  <span className="text-accent font-semibold">
                    accessible, performant, and scalable applications
                  </span>{" "}
                  that provide real value to users.
                </p>
              </div>

              {/* Values Cards */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {valueCards.map((value, i) => {
                  const cm = colorMap[value.color];
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.label}
                      className="group relative p-4 rounded-xl bg-card/50 border border-border hover:border-primary/50 transition-all hover:scale-105 cursor-pointer"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${cm.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`}
                      />
                      <Icon className={`w-6 h-6 ${cm.icon} mb-2 relative z-10`} />
                      <p className="text-sm text-foreground/80 font-medium relative z-10">
                        {value.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Image & Visual Card */}
            <div className="space-y-8 animate-slide-in-right">
              {/* Profile Image Card */}
              <div className="group relative w-64 h-96 mx-auto bg-gradient-to-br from-card to-background rounded-2xl overflow-hidden border border-border shadow-2xl">
                {/* Animated Border Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#7EE78712_1px,transparent_1px),linear-gradient(to_bottom,#7EE78712_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* Floating Elements */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-float" />
                <div className="absolute bottom-8 left-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float-delayed" />

                {/* Profile Image */}
                <img
                  src="/assets/formal.png"
                  alt="Satyajyoti Mohanty"
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.1);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(15px) scale(0.9);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-float-delayed,
          .animate-fade-in-up,
          .animate-slide-in-left,
          .animate-slide-in-right {
            animation: none !important;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}