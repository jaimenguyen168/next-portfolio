"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import SimpleIcon from "@/components/simple-icon";

import { useState } from "react";
import posthog from "posthog-js";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/jaimenguyen168",
    icon: <GitHubIcon size={18} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jaime168/",
    icon: <LinkedInIcon size={18} />,
  },
  {
    label: "Email",
    href: "mailto:jaimenguyen168@gmail.com",
    icon: <Mail size={18} />,
  },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      posthog.capture("contact_form_submitted", {
        has_message: true,
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      posthog.capture("contact_form_failed");
    }
  };

  return (
    <section
      id="contact"
      className="section-full px-6 md:px-16 pt-6 md:pt-12 flex flex-col justify-between"
    >
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Heading */}
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-1 md:mb-4 gradient-text-blue">
            Get In Touch
          </h2>
          <p className="text-xs md:text-base text-muted-foreground">
            Have a project in mind? Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start">
          {/* Left — form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 md:gap-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-xs md:text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                disabled={status === "loading" || status === "success"}
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm text-slate-200 bg-surface border-subtle outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs md:text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={status === "loading" || status === "success"}
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm text-slate-200 bg-surface border-subtle outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-xs md:text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === "loading" || status === "success"}
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm text-slate-200 bg-surface border-subtle outline-none resize-none placeholder:text-muted-foreground disabled:opacity-50"
              />
            </div>

            {/* Feedback */}
            {status === "success" && (
              <motion.div
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 size={15} className="shrink-0" />
                Message sent! I&apos;ll get back to you soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={15} className="shrink-0" />
                Something went wrong. Please try again.
              </motion.div>
            )}

            <button
              type="submit"
              disabled={
                status === "loading" ||
                status === "success" ||
                !name ||
                !email ||
                !message
              }
              className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-lg font-medium text-white text-sm bg-purple-gradient hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={15} /> Sent!
                </>
              ) : (
                <>
                  <Send size={15} /> Send Message
                </>
              )}
            </button>
          </motion.form>

          {/* Right */}
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Title — desktop only */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="hidden md:block"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Let&apos;s Connect
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </motion.div>

            {/* Mobile: "Let's Connect" label */}
            <motion.p
              className="text-sm font-semibold text-white md:hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Let&apos;s Connect
            </motion.p>

            {/* Mobile: all icons in one row */}
            <motion.div
              className="flex md:hidden gap-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${link.label} profile`}
                  onClick={() => posthog.capture("social_link_clicked", { platform: link.label })}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface hover:bg-white/[0.07] transition-colors text-accent-light"
                >
                  <span aria-hidden="true">{link.icon}</span>
                </Link>
              ))}
            </motion.div>

            {/* Desktop: each slides in one at a time */}
            {socialLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className="hidden md:block"
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${link.label} profile`}
                  onClick={() => posthog.capture("social_link_clicked", { platform: link.label })}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg bg-surface hover:bg-white/[0.07] transition-colors"
                >
                  <div
                    aria-hidden="true"
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-icon-indigo text-accent-light"
                  >
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            <motion.div
              className="pt-3 border-top-subtle hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <p className="text-sm font-medium mb-1 text-accent-light">
                Available for:
              </p>
              <p className="text-sm text-muted-foreground">
                Full-time opportunities, Freelance projects & Collaborations
              </p>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
