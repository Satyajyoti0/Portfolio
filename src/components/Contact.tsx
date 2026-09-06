"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            setSubmitStatus("success");
            reset();
        } catch (err) {
            console.error(err);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="scroll-mt-14 relative py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <div className="mb-16 max-w-2xl">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Contact</span>
                    <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Let's Talk</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Have an idea, project, or opportunity? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-16">
                    {/* Left: Contact info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Contact details */}
                        <div className="space-y-4">
                            <a
                                href="mailto:satyajyoti05@gmail.com"
                                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <FiMail className="w-5 h-5" />
                                <span>satyajyoti05@gmail.com</span>
                            </a>

                            <div className="flex items-center gap-3 text-muted-foreground">
                                <FiMapPin className="w-5 h-5" />
                                <span>Jatani, Odisha, India</span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="pt-4">
                            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                                Follow
                            </h3>
                            <div className="flex gap-3">
                                <a
                                    href="https://github.com/Zenus004"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                                    aria-label="GitHub"
                                >
                                    <FiGithub className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/satyajyoti-mohanty-716674266"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <FiLinkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                                    Name
                                </label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    id="name"
                                    className={`w-full px-4 py-3 bg-card border ${errors.name ? 'border-red-500' : 'border-border'} focus:border-primary focus:outline-none transition-colors`}
                                    placeholder="Your name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                    Email
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    className={`w-full px-4 py-3 bg-card border ${errors.email ? 'border-red-500' : 'border-border'} focus:border-primary focus:outline-none transition-colors`}
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                                    Message
                                </label>
                                <textarea
                                    {...register("message")}
                                    id="message"
                                    rows={5}
                                    className={`w-full px-4 py-3 bg-card border ${errors.message ? 'border-red-500' : 'border-border'} focus:border-primary focus:outline-none transition-colors resize-none`}
                                    placeholder="Your message..."
                                />
                                {errors.message && (
                                    <p className="text-sm text-red-500">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-foreground text-background font-medium text-sm hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>

                            {/* Status messages */}
                            {submitStatus === "success" && (
                                <p className="text-green-600 text-center text-sm">Message sent successfully!</p>
                            )}
                            {submitStatus === "error" && (
                                <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
