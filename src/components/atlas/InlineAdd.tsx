// Inline add input · GOAL-1-FEEL · replaces prompt() · Notion-calm
import { useEffect, useRef, useState } from "react";

export function InlineAdd({
  placeholder,
  depth = 0,
  onSubmit,
  onCancel,
}: {
  placeholder: string;
  depth?: number;
  onSubmit: (title: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && value.trim()) onSubmit(value.trim());
        if (e.key === "Escape") onCancel();
      }}
      onBlur={() => (value.trim() ? onSubmit(value.trim()) : onCancel())}
      placeholder={placeholder}
      className="w-full rounded-md border-0 bg-transparent px-2 py-1 text-sm outline-none"
      style={{
        paddingLeft: `${depth * 12 + 30}px`,
        color: "var(--atlas-text)",
        background: "var(--atlas-hover)",
      }}
    />
  );
}
