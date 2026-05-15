import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, ImageIcon, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type PlanetMark } from "../constants/beyondDefaults";
import posthog from "posthog-js";

const EMOJIS = [
  "👋",
  "🌟",
  "🚀",
  "💫",
  "🎉",
  "❤️",
  "🔥",
  "✨",
  "🌙",
  "⭐",
  "🪐",
  "🌌",
  "💙",
  "🎨",
  "🤝",
  "😊",
];

const PRESET_MARKS = [
  "Just passing by 👋",
  "Love your work!",
  "Fellow developer here 💻",
  "Inspired by this ✨",
  "Really impressive!",
  "Hello from across the galaxy 🌌",
  "Keep building cool things 🚀",
  "This resonates with me deeply",
  "You've got a new fan ⭐",
  "Been here, loved it!",
];

export function AddMarkDialog({
  open,
  onClose,
  planetId,
  accentColor,
  onPosted,
}: {
  open: boolean;
  onClose: () => void;
  planetId: string;
  accentColor: string;
  onPosted: (r: PlanetMark) => void;
}) {
  const [emoji, setEmoji] = useState("👋");
  const [nickname, setNickname] = useState("");
  const [mark, setMark] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPresets, setShowPresets] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmoji("👋");
      setNickname("");
      setMark("");
      setImageFile(null);
      setImagePreview(null);
      setError("");
      setShowPresets(false);
    }
  }, [open]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleSubmit = async () => {
    if (!mark.trim()) {
      setError("Write something!");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("planetId", planetId);
      fd.append("emoji", emoji);
      fd.append("nickname", nickname.trim());
      fd.append("mark", mark.trim());
      if (imageFile) fd.append("image", imageFile);
      const res = await fetch("/api/planet-mark", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed");
      posthog.capture("planet_mark_submitted", {
        planet_id: planetId,
        has_nickname: !!nickname.trim(),
        has_image: !!imageFile,
        mark_length: mark.trim().length,
      });
      onPosted({
        _id: `temp-${Date.now()}`,
        emoji,
        nickname: nickname.trim() || undefined,
        mark: mark.trim(),
        imageUrl: imagePreview ?? undefined,
        submittedAt: new Date().toISOString(),
      });
      onClose();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-full sm:max-w-xl p-0 gap-0 border-0 overflow-hidden"
        style={{
          background: "rgba(8,12,36,0.98)",
          border: `1px solid ${accentColor}40`,
          boxShadow: `0 0 40px ${accentColor}22, 0 20px 60px rgba(0,0,0,0.7)`,
        }}
      >
        <DialogHeader
          className="flex-row items-center justify-between px-4 pt-4 pb-3 border-b space-y-0"
          style={{ borderColor: `${accentColor}20` }}
        >
          <DialogTitle className="text-sm font-semibold text-white">
            Leave your mark ✍️
          </DialogTitle>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X size={11} />
          </button>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-4 flex flex-col gap-3">
            <div>
              <p className="text-[11px] text-slate-300 uppercase tracking-widest mb-2">
                Pick your emoji
              </p>
              <div className="flex flex-wrap gap-1.5">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className="w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all"
                    style={
                      emoji === e
                        ? {
                            background: `${accentColor}25`,
                            outline: `2px solid ${accentColor}`,
                            transform: "scale(1.15)",
                          }
                        : { opacity: 0.55 }
                    }
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your name or nickname (optional)"
              maxLength={80}
              className="w-full bg-white/8 border border-white/15 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/40 placeholder:text-slate-400 transition-colors"
            />

            <div>
              <button
                onClick={() => setShowPresets((v) => !v)}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 mb-2 transition-colors"
              >
                {showPresets ? (
                  <ChevronUp size={11} />
                ) : (
                  <ChevronDown size={11} />
                )}
                Quick marks
              </button>
              <AnimatePresence>
                {showPresets && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-1.5 pb-2">
                      {PRESET_MARKS.map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setMark(p);
                            setShowPresets(false);
                          }}
                          className="text-xs px-2.5 py-1 rounded-full border border-white/20 text-slate-300 hover:border-white/40 hover:text-white transition-all"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <textarea
                value={mark}
                onChange={(e) => setMark(e.target.value.slice(0, 1000))}
                placeholder="Leave your mark on this planet…"
                rows={4}
                className="w-full bg-white/8 border border-white/15 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-white/40 placeholder:text-slate-400 transition-colors resize-none"
              />
              <span className="absolute bottom-2 right-2 text-[10px] text-slate-400">
                {mark.length}/1000
              </span>
            </div>

            <div>
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <ImageIcon size={12} />
                {imageFile
                  ? imageFile.name.slice(0, 24) +
                    (imageFile.name.length > 24 ? "…" : "")
                  : "Attach a photo (optional)"}
              </button>
              {imageFile && (
                <button
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 ml-3"
                >
                  remove
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
              {imagePreview && (
                <div className="mt-2 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt=""
                    className="w-full max-h-24 object-cover"
                  />
                </div>
              )}
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
        </ScrollArea>

        <div
          className="px-4 pb-4 pt-2 border-t"
          style={{ borderColor: `${accentColor}20` }}
        >
          <button
            onClick={handleSubmit}
            disabled={submitting || !mark.trim()}
            className="w-full rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            style={{
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}50`,
              color: accentColor,
            }}
          >
            {submitting ? (
              <span className="animate-pulse">Posting…</span>
            ) : (
              <>
                <Send size={13} /> Post your mark
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
