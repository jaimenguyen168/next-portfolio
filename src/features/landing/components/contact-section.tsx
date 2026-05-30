"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { useState } from "react";
import posthog from "posthog-js";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/jaimenguyen168",
    icon: (
      <Image
        src="/github-logo.svg"
        width={18}
        height={18}
        alt="GitHub"
        aria-hidden={true}
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jaime168/",
    icon: (
      <Image
        src="/linkedin-logo.svg"
        width={18}
        height={18}
        alt="LinkedIn"
        aria-hidden={true}
      />
    ),
  },
  {
    label: "Hugging Face",
    href: "https://huggingface.co/jaime168",
    icon: (
      <Image
        src="/hf-logo.svg"
        width={20}
        height={20}
        alt="Hugging Face"
        aria-hidden={true}
      />
    ),
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
                rows={8}
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
                  onClick={() =>
                    posthog.capture("social_link_clicked", {
                      platform: link.label,
                    })
                  }
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
                  onClick={() =>
                    posthog.capture("social_link_clicked", {
                      platform: link.label,
                    })
                  }
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
