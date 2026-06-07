"use client";
// TdahKbd · keyboard shortcut listener · ⌘1 focus · ⌘2 resume · ⌘3 jumps · ⌘4 goals
// Per #27840 taste-move greenlit + #27809 ADHD-friendly fast-pivot

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TdahKbd() {
  const router = useRouter();
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey)) return;
      // ignore Cmd+K (search) · NavBar handles
      const key = e.key;
      const map: Record<string, string> = {
        "1": "/focus",
        "2": "/resume",
        "3": "/jumps",
        "4": "/goals",
      };
      const dest = map[key];
      if (dest) {
        e.preventDefault();
        router.push(dest);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router]);
  return null;
}
