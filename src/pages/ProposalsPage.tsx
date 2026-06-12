// Proposals · eval-gate · WE-50/50 #27601 · 1-click approve/reject
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { listProposals, decideProposal, type Proposal, type NavItem } from "../lib/db";

export default function ProposalsPage({ item }: { item: NavItem }) {
  const [rows, setRows] = useState<Proposal[]>([]);
  const reload = () => listProposals().then(setRows).catch(() => setRows([]));
  useEffect(() => { reload(); }, []);

  const decide = async (id: string, status: "approved" | "rejected") => {
    await decideProposal(id, status);
    reload();
  };

  const pending = rows.filter((r) => r.status === "pending");
  const decided = rows.filter((r) => r.status !== "pending");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 px-6 py-4 backdrop-blur md:px-10" style={{ background: "rgba(255,255,255,0.94)", borderBottom: "1px solid var(--border)" }}>
        <h1 className="text-2xl font-semibold">{item.emoji} {item.title}</h1>
        <div className="mt-0.5 text-xs" style={{ color: "var(--text-faint)" }}>
          Atlas proposes · you decide · {pending.length} waiting
        </div>
      </header>
      <div className="mx-auto max-w-3xl space-y-2 px-6 py-6 md:px-10">
        {pending.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{p.name}</div>
              <div className="mt-0.5 text-xs" style={{ color: "var(--text-soft)" }}>{p.summary}</div>
            </div>
            <button className="rounded-lg p-2 text-white" style={{ background: "#448361" }} title="Approve" onClick={() => void decide(p.id, "approved")}>
              <Check size={15} />
            </button>
            <button className="rounded-lg border p-2" style={{ borderColor: "var(--border)", color: "#c4554d" }} title="Reject" onClick={() => void decide(p.id, "rejected")}>
              <X size={15} />
            </button>
          </div>
        ))}
        {pending.length === 0 && <div className="py-8 text-center text-sm" style={{ color: "var(--text-faint)" }}>Nothing waiting · all decided</div>}
        {decided.length > 0 && (
          <div className="pt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Decided</div>
            {decided.map((p) => (
              <div key={p.id} className="flex items-center gap-2 px-1 py-1 text-sm" style={{ opacity: 0.6 }}>
                <span>{p.status === "approved" ? "✅" : "❌"}</span>
                <span className="truncate">{p.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
