import Link from "next/link";

const links = [
  { href: "/you", label: "YOU" },
  { href: "/us", label: "US" },
  { href: "/arms", label: "ARMS" },
  { href: "/map", label: "MAP" },
  { href: "/archive", label: "ARCHIVE" },
  { href: "/scratch", label: "SCRATCH" },
  { href: "/chat", label: "CHAT" },
] as const;

export function AxisNav() {
  return (
    <nav
      className="flex items-center justify-center gap-16 py-8 text-xs tracking-[0.3em] uppercase"
      aria-label="Primary navigation"
    >
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-[var(--paper)]/40 transition-colors hover:text-[var(--paper)]"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
