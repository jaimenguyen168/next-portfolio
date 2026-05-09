"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatWidget = dynamic(() => import("./chat-widget"), { ssr: false });

export default function ChatWidgetLoader() {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) return null;

  return <ChatWidget />;
}
