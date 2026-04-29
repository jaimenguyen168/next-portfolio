"use client";

import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, User, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Parse text with [label](url) markdown links into segments
type Segment = { type: "text"; value: string } | { type: "link"; label: string; href: string };

function parseSegments(text: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) segments.push({ type: "text", value: text.slice(last, match.index) });
    segments.push({ type: "link", label: match[1], href: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ type: "text", value: text.slice(last) });
  return segments;
}

function MessageContent({ content }: { content: string }) {
  const segments = parseSegments(content);
  return (
    <span className="whitespace-pre-wrap break-words">
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        const isInternal = seg.href.startsWith("/");
        return isInternal ? (
          <Link
            key={i}
            href={seg.href}
            className="inline-flex items-center gap-1 mx-0.5 px-2 py-0.5 rounded-md bg-accent/20 border border-accent-light/30 text-accent-light hover:bg-accent/40 hover:border-accent-light/60 transition-colors text-xs font-medium cursor-pointer"
          >
            {seg.label} ↗
          </Link>
        ) : (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mx-0.5 px-2 py-0.5 rounded-md bg-accent/20 border border-accent-light/30 text-accent-light hover:bg-accent/40 hover:border-accent-light/60 transition-colors text-xs font-medium cursor-pointer"
          >
            {seg.label} ↗
          </a>
        );
      })}
    </span>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({ api: "/api/chat" });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Chat card */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-card"
            initial={{ opacity: 0, scale: 0.88, y: 24, rotateX: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24, rotateX: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            style={{ transformOrigin: "bottom right", perspective: 900 }}
            className="fixed bottom-20 right-2 md:bottom-24 md:right-6 z-50 w-[calc(100vw-1rem)] md:w-[calc(100vw-2rem)] max-w-sm flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-950/60 h-[480px] max-h-[calc(100dvh-6rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Jaime's AI assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8"
              style={{ background: "linear-gradient(135deg, #0d1535 0%, #0b1230 100%)" }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/15 shrink-0"
                  whileHover={{ scale: 1.08 }}
                >
                  <Image src="/jaime.png" alt="Jaime" fill className="object-cover" />
                  {/* online dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0b1230]" />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">Jaime.ai</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">AI-powered me ✨</p>
                </div>
              </div>
              <motion.button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={15} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#060c22] min-h-0">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex gap-2.5"
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/15 shrink-0 mt-0.5">
                    <Image src="/jaime.png" alt="Jaime.ai" fill className="object-cover" />
                  </div>
                  <div className="bg-[#0b1230] border border-white/8 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-slate-300 leading-relaxed max-w-[85%]">
                    Hey! 👋 I&apos;m Jaime.ai — ask me anything about my work, skills, or what I can build for you.
                  </div>
                </motion.div>
              )}

              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
                  >
                    {isUser ? (
                      <div className="w-7 h-7 rounded-full bg-purple-600/30 flex items-center justify-center shrink-0 mt-0.5">
                        <User size={14} className="text-accent-light" aria-hidden="true" />
                      </div>
                    ) : (
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/15 shrink-0 mt-0.5">
                        <Image src="/jaime.png" alt="Jaime.ai" fill className="object-cover" />
                      </div>
                    )}
                    <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                      isUser
                        ? "bg-purple-gradient text-white rounded-tr-sm"
                        : "bg-[#0b1230] border border-white/8 text-slate-300 rounded-tl-sm"
                    }`}>
                      <MessageContent content={m.content} />
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/15 shrink-0 mt-0.5">
                    <Image src="/jaime.png" alt="Jaime.ai" fill className="object-cover" />
                  </div>
                  <div className="bg-[#0b1230] border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-accent-light"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {error && (
                <p className="text-xs text-red-400 text-center">Something went wrong. Try again.</p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 bg-[#0b1230] border-t border-white/8"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about Jaime's projects..."
                disabled={isLoading}
                aria-label="Chat message input"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[16px] md:text-sm text-slate-200 placeholder:text-muted-foreground outline-none focus:border-accent-light/40 transition-colors disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-purple-gradient text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
              >
                {isLoading
                  ? <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  : <Send size={15} aria-hidden="true" />
                }
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with Jaime.ai"}
        aria-expanded={open}
        className="fixed bottom-5 right-4 md:right-6 z-50 w-14 h-14 rounded-2xl bg-purple-gradient text-white flex items-center justify-center cursor-pointer"
        style={{ boxShadow: "0 0 24px rgba(109,40,217,0.5), 0 4px 16px rgba(0,0,0,0.4)" }}
        whileHover={{
          scale: 1.12,
          boxShadow: "0 0 36px rgba(129,140,248,0.6), 0 6px 20px rgba(0,0,0,0.4)",
        }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1 }}
      >
        {/* Pulse ring when closed */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-purple-400/50"
            animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -120, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 120, opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {open
              ? <X size={22} aria-hidden="true" />
              : <Sparkles size={22} aria-hidden="true" />
            }
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
