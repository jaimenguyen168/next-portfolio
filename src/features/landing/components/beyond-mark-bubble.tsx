"use client";

import { type PlanetMark } from "../constants/beyondDefaults";

function Avatar({
  emoji,
  initials,
  accentColor,
}: {
  emoji: string;
  initials: string | null;
  accentColor: string;
}) {
  return (
    <div
      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm leading-none"
      style={{
        background: `${accentColor}20`,
        border: `1px solid ${accentColor}40`,
      }}
    >
      {initials ? (
        <span className="text-[10px] font-bold" style={{ color: accentColor }}>
          {initials}
        </span>
      ) : (
        <span>{emoji}</span>
      )}
    </div>
  );
}

export function MarkBubble({
  r,
  accentColor,
}: {
  r: PlanetMark;
  accentColor: string;
}) {
  const initials = r.nickname
    ? r.nickname
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : null;

  if (r.imageUrl) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2.5 items-center">
          <Avatar
            emoji={r.emoji}
            initials={initials}
            accentColor={accentColor}
          />
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            {initials && (
              <span className="text-sm leading-none">{r.emoji}</span>
            )}
            {r.nickname && (
              <span
                className="text-xs font-semibold"
                style={{ color: accentColor }}
              >
                {r.nickname}
              </span>
            )}
            <span className="text-[10px] text-slate-600 ml-auto shrink-0">
              {new Date(r.submittedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.imageUrl}
            alt=""
            className="w-full object-cover"
            style={{ maxHeight: 200 }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <p className="absolute bottom-0 left-0 right-0 p-3 text-sm text-white leading-snug wrap-break-word">
            {r.mark}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 items-start">
      <Avatar emoji={r.emoji} initials={initials} accentColor={accentColor} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          {initials && <span className="text-sm leading-none">{r.emoji}</span>}
          {r.nickname && (
            <span
              className="text-xs font-semibold"
              style={{ color: accentColor }}
            >
              {r.nickname}
            </span>
          )}
          <span className="text-[10px] text-slate-600 ml-auto shrink-0">
            {new Date(r.submittedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed wrap-break-word">
          {r.mark}
        </p>
      </div>
    </div>
  );
}
