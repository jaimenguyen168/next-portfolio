import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, FlagIcon, PenLine, X } from "lucide-react";
import { type ValueDef, type PlanetMark } from "../constants/beyondDefaults";
import { ImageCarousel } from "./beyond-image-carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MarkBubble } from "./beyond-mark-bubble";
import { AddMarkDialog } from "./beyond-add-mark-dialog";

type Props = {
  active: { value: ValueDef; x: number; y: number } | null;
  showCard: boolean;
  size: { w: number; h: number };
  onClose: () => void;
  onDismiss: () => void;
};

export function BeyondPlanetCard({
  active,
  showCard,
  onClose,
  onDismiss,
}: Props) {
  const [marksOpen, setMarksOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [optimisticMarks, setOptimisticMarks] = useState<PlanetMark[]>([]);
  const [trackedId, setTrackedId] = useState<string | null>(null);

  const currentId = active?.value?.id ?? null;
  if (trackedId !== currentId) {
    setTrackedId(currentId);
    setMarksOpen(false);
    setAddDialogOpen(false);
    setOptimisticMarks([]);
  }

  useEffect(() => {
    const main = document.querySelector("main") as HTMLElement | null;
    if (!main) return;
    main.style.overflow = active && showCard ? "hidden" : "";
    return () => {
      main.style.overflow = "";
    };
  }, [active, showCard]);

  const handlePosted = (r: PlanetMark) => {
    setOptimisticMarks((prev) => [r, ...prev]);
    setMarksOpen(true);
  };

  const sourceMarks = active?.value?.marks ?? [];
  const optimisticIds = new Set(optimisticMarks.map((m) => m._id));
  const marks = [
    ...optimisticMarks,
    ...sourceMarks.filter((m) => !optimisticIds.has(m._id)),
  ];

  const isOpen = !!(active && showCard);
  const color = active?.value?.accentColor ?? "#7c7cff";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(v) => !v && onDismiss()}>
        <DialogContent
          showCloseButton={false}
          className="w-full sm:max-w-xl! p-0 gap-0 border-0 flex flex-col"
          style={{
            background: "rgba(8,12,36,0.98)",
            border: `1px solid ${color}40`,
            boxShadow: `0 0 40px ${color}28, 0 20px 60px rgba(0,0,0,0.7)`,
            maxHeight: "min(90vh, 840px)",
          }}
        >
          {/* Image header */}
          <div
            className="relative shrink-0 overflow-hidden rounded-t-xl"
            style={{ height: 300, background: active?.value?.accentBg }}
          >
            {active?.value?.images && active.value.images.length > 0 ? (
              active.value.images.length === 1 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.value.images[0]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <ImageCarousel
                  images={active.value.images}
                  accentColor={color}
                />
              )
            ) : (
              <>
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  preserveAspectRatio="none"
                >
                  {[...Array(6)].map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={`${(i + 1) * 16.6}%`}
                      y1="0"
                      x2={`${(i + 1) * 16.6}%`}
                      y2="100%"
                      stroke={color}
                      strokeWidth="0.5"
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="0"
                      y1={`${(i + 1) * 25}%`}
                      x2="100%"
                      y2={`${(i + 1) * 25}%`}
                      stroke={color}
                      strokeWidth="0.5"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: `${color}30`,
                      border: `2px solid ${color}60`,
                      boxShadow: `0 0 20px ${color}40`,
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle
                        cx="14"
                        cy="14"
                        r="12"
                        fill={color}
                        opacity="0.9"
                      />
                      <circle
                        cx="10"
                        cy="11"
                        r="4"
                        fill="white"
                        opacity="0.15"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}
            <div
              className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,12,36,0.98) 0%, transparent 100%)",
              }}
            />
            <span
              className="absolute bottom-2 left-4 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              {active?.value?.label}
            </span>
            <button
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              onClick={onClose}
            >
              <X size={12} />
            </button>
          </div>

          {/* Static body */}
          <div className="shrink-0 p-4 flex flex-col gap-3">
            <DialogTitle className="text-base font-bold text-white leading-snug">
              {active?.value?.title}
            </DialogTitle>
            <p className="text-sm text-slate-400 leading-relaxed">
              {active?.value?.body}
            </p>

            <div className="border-t" style={{ borderColor: `${color}20` }}>
              <button
                onClick={() => setMarksOpen((v) => !v)}
                className="w-full flex items-center justify-between py-2.5 text-sm"
                style={{ color }}
              >
                <span className="font-semibold flex items-center gap-2">
                  <FlagIcon size={14} /> Marks
                  <span className="text-xs font-normal opacity-90">
                    ({marks.length})
                  </span>
                </span>
                {marksOpen ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>
            </div>
          </div>

          {/* Marks scrollable area */}
          {marksOpen && (
            <div
              className="flex-1 overflow-y-auto min-h-0 px-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.15) transparent",
              }}
            >
              {marks.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">
                  No marks yet. Be the first!
                </p>
              ) : (
                <div
                  className="divide-y pb-3"
                  style={{ borderColor: `${color}15` }}
                >
                  {marks.map((r) => (
                    <div key={r._id} className="py-3">
                      <MarkBubble r={r} accentColor={color} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom button */}
          <div
            className="shrink-0 px-4 py-3 border-t"
            style={{ borderColor: `${color}20` }}
          >
            <button
              onClick={() => setAddDialogOpen(true)}
              className="w-full rounded-xl py-2 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{
                background: `${color}18`,
                border: `1px solid ${color}45`,
                color,
              }}
            >
              <PenLine size={14} /> Were you here? Leave your mark
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <AddMarkDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        planetId={active?.value?.id ?? ""}
        accentColor={color}
        onPosted={handlePosted}
      />
    </>
  );
}
