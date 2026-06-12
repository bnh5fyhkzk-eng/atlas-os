// Right-click context menu for tree nodes · GOAL-1-FEEL T26 (6 actions)
// add · rename · emoji · pin · hide · archive(soft · LADDER-restorable)
import { useEffect, useRef } from "react";
import { Plus, Pencil, Smile, Pin, PinOff, Eye, EyeOff, Archive } from "lucide-react";
import type { Page } from "@/lib/atlas-supabase";

export interface MenuState {
  x: number;
  y: number;
  page: Page;
}

const EMOJI_CHOICES = ["📄", "🌱", "🔥", "💡", "🎯", "🧠", "📌", "⭐", "🛠", "📊", "🌙", "🤝"];

export function PageContextMenu({
  menu,
  onClose,
  onAddChild,
  onRename,
  onEmoji,
  onTogglePin,
  onToggleHide,
  onArchive,
}: {
  menu: MenuState;
  onClose: () => void;
  onAddChild: (id: string) => void;
  onRename: (id: string) => void;
  onEmoji: (id: string, emoji: string) => void;
  onTogglePin: (page: Page) => void;
  onToggleHide: (page: Page) => void;
  onArchive: (page: Page) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  const { page } = menu;
  const style = {
    left: Math.min(menu.x, window.innerWidth - 200),
    top: Math.min(menu.y, window.innerHeight - 280),
  };

  return (
    <div ref={ref} className="atlas-menu" style={style}>
      <button onClick={() => { onAddChild(page.id); onClose(); }}>
        <Plus size={13} /> Add sub-page
      </button>
      <button onClick={() => { onRename(page.id); onClose(); }}>
        <Pencil size={13} /> Rename
      </button>
      <div className="px-2 py-1.5">
        <div className="mb-1 flex items-center gap-1 text-xs" style={{ color: "var(--atlas-text-faint)" }}>
          <Smile size={12} /> Emoji
        </div>
        <div className="grid grid-cols-6 gap-0.5">
          {EMOJI_CHOICES.map((e) => (
            <button
              key={e}
              className="rounded p-0.5 text-sm hover:bg-black/5"
              style={{ width: "auto" }}
              onClick={() => { onEmoji(page.id, e); onClose(); }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => { onTogglePin(page); onClose(); }}>
        {page.pinned ? <PinOff size={13} /> : <Pin size={13} />}
        {page.pinned ? "Unpin" : "Pin to top"}
      </button>
      <button onClick={() => { onToggleHide(page); onClose(); }}>
        {page.hidden ? <Eye size={13} /> : <EyeOff size={13} />}
        {page.hidden ? "Unhide" : "Hide"}
      </button>
      <button className="danger" onClick={() => { onArchive(page); onClose(); }}>
        <Archive size={13} /> Archive (restorable)
      </button>
    </div>
  );
}
