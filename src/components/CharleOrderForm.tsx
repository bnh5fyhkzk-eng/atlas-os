"use client";

import { useState } from "react";
import { SERVICES, contactFieldsFor, findService, type Field } from "@/lib/charle-services";

type Step = "services" | "contact" | "details" | "review" | "submitted";

type FormState = Record<string, Record<string, string | number>>;

const inputBase =
  "w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:border-neutral-500 focus:outline-none";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string | number | undefined;
  onChange: (v: string) => void;
}) {
  const v = value ?? "";
  if (field.type === "select") {
    return (
      <select className={inputBase} value={v as string} onChange={e => onChange(e.target.value)}>
        <option value="">— choisir —</option>
        {field.options?.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "textarea") {
    return (
      <textarea
        className={inputBase}
        rows={3}
        value={v as string}
        placeholder={field.placeholder}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
  return (
    <input
      className={inputBase}
      type={field.type}
      value={v as string}
      placeholder={field.placeholder}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export function CharleOrderForm() {
  const [step, setStep] = useState<Step>("services");
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>({ contact: {} });
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const setContact = (fieldId: string, val: string) => {
    setForm(prev => ({ ...prev, contact: { ...prev.contact, [fieldId]: val } }));
  };

  const setSvc = (svcId: string, fieldId: string, val: string) => {
    setForm(prev => ({ ...prev, [svcId]: { ...(prev[svcId] || {}), [fieldId]: val } }));
  };

  const contactFields = contactFieldsFor(selected);

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/charle-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: selected, form, ts: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // persist to localStorage for tableau (v0.1 · upgrade to atlas-api later)
      try {
        const key = "charle-orders-v1";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.unshift({ id: data.id, ts: data.ts, services: selected, form });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {
        // localStorage may be blocked · still continue
      }
      setSubmittedId(data.id);
      setStep("submitted");
    } catch (e) {
      setError(e instanceof Error ? e.message : "submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  // -- render per step --

  if (step === "services") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl text-neutral-100">1 · Quels services le client veut-il?</h2>
          <p className="text-sm text-neutral-500 mt-1">Sélectionne tous les services applicables.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {SERVICES.map(s => {
            const on = selected.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggleService(s.id)}
                className={`text-left rounded border p-4 transition-colors ${
                  on ? "border-amber-500 bg-amber-500/5" : "border-neutral-800 hover:border-neutral-600"
                }`}
              >
                <div className="text-neutral-200">{s.label}</div>
                <div className="text-xs text-neutral-500 mt-1">{s.fournisseur} · {s.category}</div>
              </button>
            );
          })}
        </div>
        <div className="flex justify-end">
          <button
            disabled={selected.length === 0}
            onClick={() => setStep("contact")}
            className="rounded bg-amber-500 px-4 py-2 text-black disabled:opacity-40"
          >
            Continuer →
          </button>
        </div>
      </div>
    );
  }

  if (step === "contact") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl text-neutral-100">2 · Coordonnées</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Champs adaptés selon les services choisis ({selected.length} service{selected.length > 1 ? "s" : ""}).
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {contactFields.map(f => (
            <label key={f.id} className="block space-y-1">
              <span className="text-xs uppercase tracking-wider text-neutral-500">
                {f.label}
                {f.required ? " *" : ""}
              </span>
              <FieldInput
                field={f}
                value={form.contact?.[f.id]}
                onChange={v => setContact(f.id, v)}
              />
            </label>
          ))}
        </div>
        <div className="flex justify-between">
          <button onClick={() => setStep("services")} className="text-sm text-neutral-500 hover:text-neutral-300">
            ← retour
          </button>
          <button
            onClick={() => setStep("details")}
            className="rounded bg-amber-500 px-4 py-2 text-black"
          >
            Continuer →
          </button>
        </div>
      </div>
    );
  }

  if (step === "details") {
    return (
      <div className="space-y-10">
        <div>
          <h2 className="text-xl text-neutral-100">3 · Détails par service</h2>
          <p className="text-sm text-neutral-500 mt-1">Une section par service sélectionné.</p>
        </div>
        {selected.map(id => {
          const svc = findService(id);
          if (!svc) return null;
          return (
            <div key={id} className="border-l-2 border-amber-500/40 pl-6 space-y-4">
              <div className="text-neutral-200">
                <span className="text-amber-400">{svc.fournisseur}</span> · {svc.label}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {svc.fields.map(f => (
                  <label key={f.id} className="block space-y-1">
                    <span className="text-xs uppercase tracking-wider text-neutral-500">
                      {f.label}
                      {f.required ? " *" : ""}
                    </span>
                    <FieldInput
                      field={f}
                      value={form[id]?.[f.id]}
                      onChange={v => setSvc(id, f.id, v)}
                    />
                  </label>
                ))}
              </div>
            </div>
          );
        })}
        <div className="flex justify-between">
          <button onClick={() => setStep("contact")} className="text-sm text-neutral-500 hover:text-neutral-300">
            ← retour
          </button>
          <button onClick={() => setStep("review")} className="rounded bg-amber-500 px-4 py-2 text-black">
            Réviser →
          </button>
        </div>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl text-neutral-100">4 · Révision</h2>
          <p className="text-sm text-neutral-500 mt-1">Vérifie · puis soumets pour stockage dans le tableau.</p>
        </div>
        <pre className="text-xs bg-neutral-950 border border-neutral-800 rounded p-4 overflow-x-auto text-neutral-300">
          {JSON.stringify({ services: selected, form }, null, 2)}
        </pre>
        {error && <div className="text-sm text-red-400">erreur · {error}</div>}
        <div className="flex justify-between">
          <button onClick={() => setStep("details")} className="text-sm text-neutral-500 hover:text-neutral-300">
            ← retour
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="rounded bg-amber-500 px-4 py-2 text-black disabled:opacity-40"
          >
            {submitting ? "envoi…" : "Soumettre la commande"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center py-12">
      <h2 className="text-2xl text-neutral-100">Commande enregistrée</h2>
      <p className="text-sm text-neutral-500">id · {submittedId}</p>
      <div className="pt-4">
        <a href="/charle-order-form/tableau" className="text-amber-400 hover:text-amber-300 text-sm underline">
          → voir le tableau
        </a>
      </div>
      <div>
        <button
          onClick={() => {
            setStep("services");
            setSelected([]);
            setForm({ contact: {} });
            setSubmittedId(null);
          }}
          className="text-sm text-neutral-500 hover:text-neutral-300 mt-4"
        >
          + nouvelle commande
        </button>
      </div>
    </div>
  );
}
