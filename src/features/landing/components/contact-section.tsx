"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2Icon, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useState } from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/jaimenguyen168",
    icon: <SiGithub size={18} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jaime168/",
    icon: <FaLinkedin size={18} />,
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
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-full px-6 md:px-16 py-6 md:py-12 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">

        {/* Heading */}
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-1 md:mb-4 gradient-text-blue">Get In Touch</h2>
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
              <label className="text-xs md:text-sm font-medium text-white">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === "loading" || status === "success"}
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm text-slate-200 bg-surface border-subtle outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs md:text-sm font-medium text-white">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading" || status === "success"}
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm text-slate-200 bg-surface border-subtle outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs md:text-sm font-medium text-white">Message</label>
              <textarea
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
              disabled={status === "loading" || status === "success" || !name || !email || !message}
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
              <h3 className="text-xl font-semibold text-white mb-2">Let&apos;s Connect</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
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
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface hover:bg-white/[0.07] transition-colors text-accent-light"
                >
                  {link.icon}
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
                  className="flex items-center gap-4 px-4 py-3 rounded-lg bg-surface hover:bg-white/[0.07] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-icon-indigo text-accent-light">
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium text-white">{link.label}</span>
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
              <p className="text-sm font-medium mb-1 text-accent-light">Available for:</p>
              <p className="text-sm text-muted-foreground">Full-time opportunities, Freelance projects & Collaborations</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="pt-6 md:pt-8 w-full mt-6 md:mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              const main = document.querySelector("main");
              const hero = document.querySelector("#hero");
              if (main && hero) main.scrollTo({ top: (hero as HTMLElement).offsetTop, behavior: "smooth" });
              window.history.replaceState(null, "", "/");
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-gradient">
              <Code2Icon size={16} className="text-white" />
            </div>
            <span className="text-white text-sm font-semibold">Jaime Dev</span>
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Built with{" "}
            <span className="text-accent-light">Next.js</span>{" "}
            &amp;{" "}
            <span className="text-emerald-400">Sanity</span>
          </p>
          <Link
            href="https://github.com/jaimenguyen168/NextJS-Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors"
          >
            <SiGithub size={14} /> Source code
          </Link>
        </div>
      </motion.footer>
    </section>
  );
}
