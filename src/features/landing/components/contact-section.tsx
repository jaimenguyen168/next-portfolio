"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2Icon, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

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

export default function ContactSection() {
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

          {/* Left — slides in from left */}
          <motion.form
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
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm text-slate-200 bg-surface border-subtle outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs md:text-sm font-medium text-white">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm text-slate-200 bg-surface border-subtle outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs md:text-sm font-medium text-white">Message</label>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm text-slate-200 bg-surface border-subtle outline-none resize-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 md:py-3 rounded-lg font-medium text-white text-sm bg-purple-gradient hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </motion.form>

          {/* Right — slides in from right */}
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
              <p className="text-sm text-muted-foreground">Freelance projects, Full-time opportunities, Collaborations</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="pt-6 md:pt-8 w-full border-top-subtle mt-6 md:mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-gradient">
              <Code2Icon size={16} className="text-white" />
            </div>
            <span className="text-white text-sm font-semibold">Jaime Dev</span>
          </Link>
          <p className="text-xs text-muted-foreground text-center">
            Built with{" "}
            <span className="text-accent-light">Next.js</span>{" "}
            &amp;{" "}
            <span className="text-emerald-400">Sanity</span>
          </p>
          <p className="text-xs text-muted-foreground">Ship fast. Build well.</p>
        </div>
      </motion.footer>
    </section>
  );
}
