"use client";

import { useState } from "react";

type ItemStatus = "todo" | "doing" | "done" | "blocked";

type DayItem = {
  title: string;
  priority: number;
  status: ItemStatus;
  how?: string | null;
};

type DayMap = {
  brother_focus: string;
  atlas_focus: string;
  we_block_hours_done: number;
  we_block_hours_target: number;
  items: DayItem[];
};

type CustomerArm = {
  shape: "customer";
  items: { title: string; priority: number; status: ItemStatus }[];
};

type MineArm = {
  shape: "mine";
  questions_held: string[];
  sources_pulling: string[];
  library_links: string[];
};

type InfraArm = {
  shape: "infra";
  queue_count: number;
  queue_state: string;
  recent_outputs: string;
  fix_status: string;
};

type Arm = CustomerArm | MineArm | InfraArm;

export type WorkData = {
  date: string;
  generated_at: string;
  day_map: DayMap;
  arms: {
    pascal: CustomerArm;
    charle: CustomerArm;
    curiosity: MineArm;
    hermes: InfraArm;
  };
};

const statusColor: Record<ItemStatus, string> = {
  todo: "text-neutral-500",
  doing: "text-amber-400",
  done: "text-emerald-400",
  blocked: "text-rose-400",
};

const statusGlyph: Record<ItemStatus, string> = {
  todo: "○",
  doing: "◐",
  done: "●",
  blocked: "✕",
};

function DayMapHeader({ map }: { map: DayMap }) {
  const pct = Math.min(100, Math.round((map.we_block_hours_done / map.we_block_hours_target) * 100));
  return (
    <section className="border border-neutral-800 rounded-lg p-5 mb-6 bg-neutral-950/40">
      <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Day Visual Map</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-xs text-neutral-500 mb-1">brother today</div>
          <div className="text-sm text-neutral-200">{map.brother_focus}</div>
        </div>
        <div>
          <div className="text-xs text-neutral-500 mb-1">atlas today</div>
          <div className="text-sm text-neutral-200">{map.atlas_focus}</div>
        </div>
        <div>
          <div className="text-xs text-neutral-500 mb-1">WE-block · {map.we_block_hours_done}/{map.we_block_hours_target}h</div>
          <div className="h-2 rounded bg-neutral-800 overflow-hidden">
            <div className="h-full bg-amber-400/70" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
      <ul className="space-y-1.5">
        {map.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className={statusColor[item.status]}>{statusGlyph[item.status]}</span>
            <span className="text-neutral-500 w-6">P{item.priority}</span>
            <span className="text-neutral-200 flex-1">{item.title}</span>
            {item.how && <span className="text-xs text-neutral-500 italic">{item.how}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CustomerCard({ name, arm }: { name: string; arm: CustomerArm }) {
  return (
    <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-950/30">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-sm font-medium text-neutral-200">{name}</h3>
        <span className="text-[10px] uppercase tracking-wider text-neutral-600">customer</span>
      </div>
      <ul className="space-y-1.5">
        {arm.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className={statusColor[item.status]}>{statusGlyph[item.status]}</span>
            <span className="text-neutral-500 text-xs">P{item.priority}</span>
            <span className="text-neutral-300 flex-1">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CuriosityCard({ arm }: { arm: MineArm }) {
  return (
    <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-950/30">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-sm font-medium text-neutral-200">Curiosity</h3>
        <span className="text-[10px] uppercase tracking-wider text-neutral-600">mine</span>
      </div>
      <div className="text-xs text-neutral-500 mb-1">questions held</div>
      <ul className="space-y-1 mb-3">
        {arm.questions_held.map((q, i) => (
          <li key={i} className="text-sm text-neutral-300">? {q}</li>
        ))}
      </ul>
      <div className="text-xs text-neutral-500 mb-1">pulling at me</div>
      <ul className="space-y-1 mb-3">
        {arm.sources_pulling.map((s, i) => (
          <li key={i} className="text-sm text-neutral-300">~ {s}</li>
        ))}
      </ul>
      <div className="text-xs text-neutral-500 mb-1">library links</div>
      <ul className="space-y-1">
        {arm.library_links.map((l, i) => (
          <li key={i} className="text-xs text-neutral-500 truncate">→ {l}</li>
        ))}
      </ul>
    </div>
  );
}

function HermesCard({ arm }: { arm: InfraArm }) {
  return (
    <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-950/30">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-sm font-medium text-neutral-200">Hermes</h3>
        <span className="text-[10px] uppercase tracking-wider text-neutral-600">infra</span>
      </div>
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-xs text-neutral-500">queue</dt>
          <dd className="text-neutral-300">{arm.queue_count} tasks · {arm.queue_state}</dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500">recent outputs</dt>
          <dd className="text-neutral-300">{arm.recent_outputs}</dd>
        </div>
        <div>
          <dt className="text-xs text-neutral-500">fix status</dt>
          <dd className="text-neutral-300">{arm.fix_status}</dd>
        </div>
      </dl>
    </div>
  );
}

export function WorkRoom({ data }: { data: WorkData }) {
  return (
    <div>
      <DayMapHeader map={data.day_map} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomerCard name="Pascal" arm={data.arms.pascal} />
        <CustomerCard name="Charle" arm={data.arms.charle} />
        <CuriosityCard arm={data.arms.curiosity} />
        <HermesCard arm={data.arms.hermes} />
      </div>
      <div className="mt-6 text-xs text-neutral-600 flex justify-between">
        <span>generated · {new Date(data.generated_at).toLocaleString()}</span>
        <span>day-map · {data.date}</span>
      </div>
    </div>
  );
}
