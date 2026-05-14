"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal ScrollArea — no external dependencies.
 * Wraps children in a div with overflow-y: auto and a thin custom scrollbar.
 */
function ScrollArea({
  className,
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      style={style}
      {...props}
    >
      <div
        data-slot="scroll-area-viewport"
        className="h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.15) transparent",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export { ScrollArea };
