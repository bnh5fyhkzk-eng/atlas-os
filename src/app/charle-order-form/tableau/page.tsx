"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { SERVICES, findService } from "@/lib/charle-services";

type Order = {
  id: string;
  ts: string;
  services: string[];
  form: Record<string, Record<string, string | number>>;
};

export default function CharleTableauPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("charle-orders-v1") || "[]";
      setOrders(JSON.parse(raw));
    } catch {
      setOrders([]);
    }
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter(o => o.services.includes(filter));
  }, [orders, filter]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: orders.length };
    SERVICES.forEach(s => {
      m[s.id] = orders.filter(o => o.services.includes(s.id)).length;
    });
    return m;
  }, [orders]);

  const reset = () => {
    if (confirm("Effacer toutes les commandes locales?")) {
      localStorage.removeItem("charle-orders-v1");
      setOrders([]);
    }
  };

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <header className="mb-8 border-b border-neutral-800 pb-6 flex items-baseline justify-between">
          <div>
            <div className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">CB Télécom · tableau</div>
            <h1 className="text-2xl font-light text-neutral-100 mt-2">Commandes</h1>
            <p className="text-sm text-neutral-500 mt-1">vue filtrable · {orders.length} commande{orders.length === 1 ? "" : "s"} stockée{orders.length === 1 ? "" : "s"} localement</p>
          </div>
          <div className="flex gap-4">
            <a href="/charle-order-form" className="text-sm text-amber-400 hover:text-amber-300">+ nouvelle</a>
            <button onClick={reset} className="text-sm text-neutral-600 hover:text-red-400">effacer</button>
          </div>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`text-xs px-3 py-1 rounded border ${filter === "all" ? "border-amber-500 bg-amber-500/10 text-amber-300" : "border-neutral-800 text-neutral-500 hover:border-neutral-600"}`}
          >
            Tous ({counts.all})
          </button>
          {SERVICES.map(s => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`text-xs px-3 py-1 rounded border ${filter === s.id ? "border-amber-500 bg-amber-500/10 text-amber-300" : "border-neutral-800 text-neutral-500 hover:border-neutral-600"}`}
            >
              {s.label} ({counts[s.id] || 0})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-600">
            <p className="text-sm">aucune commande</p>
            <a href="/charle-order-form" className="text-amber-400 hover:text-amber-300 text-sm mt-4 inline-block">→ créer la première</a>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-950 text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Client</th>
                  <th className="text-left p-3">Services</th>
                  <th className="text-right p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => {
                  const open = expanded === o.id;
                  return (
                    <Fragment key={o.id}>
                      <tr className="border-t border-neutral-800 hover:bg-neutral-950/50">
                        <td className="p-3 font-mono text-xs text-neutral-500">{o.id.slice(0, 16)}…</td>
                        <td className="p-3 text-neutral-400 text-xs">{new Date(o.ts).toLocaleString("fr-CA")}</td>
                        <td className="p-3 text-neutral-200">
                          {o.form.contact?.entreprise || "—"}
                          <div className="text-xs text-neutral-500">{o.form.contact?.contact_nom || ""}</div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {o.services.map(sid => {
                              const svc = findService(sid);
                              return (
                                <span key={sid} className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                                  {svc?.fournisseur || sid}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setExpanded(open ? null : o.id)}
                            className="text-xs text-neutral-500 hover:text-neutral-300"
                          >
                            {open ? "fermer" : "ouvrir"}
                          </button>
                        </td>
                      </tr>
                      {open && (
                        <tr className="border-t border-neutral-900">
                          <td colSpan={5} className="bg-neutral-950 p-4">
                            <pre className="text-xs text-neutral-400 overflow-x-auto">{JSON.stringify(o.form, null, 2)}</pre>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <footer className="mt-12 text-xs text-neutral-600">
          v0.1 prototype · localStorage · upgrade à atlas-api + Supabase pour multi-utilisateur
        </footer>
      </div>
    </main>
  );
}
