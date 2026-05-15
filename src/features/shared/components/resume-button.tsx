"use client";

import { Download } from "lucide-react";
import posthog from "posthog-js";

type Props = {
  resumeUrl: string | null;
  className?: string;
  onAfterClick?: () => void;
};

export default function ResumeButton({ resumeUrl, className, onAfterClick }: Props) {
  return (
    <button
      onClick={() => {
        onAfterClick?.();
        if (resumeUrl) {
          posthog.capture("resume_downloaded");
          window.open(resumeUrl, "_blank");
        }
      }}
      disabled={!resumeUrl}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-gradient hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed ${className ?? ""}`}
    >
      <Download size={14} /> My Resume
    </button>
  );
}
