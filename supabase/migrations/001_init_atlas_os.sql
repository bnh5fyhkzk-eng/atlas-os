-- atlas-os foundation · Notion-modular schema (atlas_* namespace · isolated from us_*)
-- Per FOUNDATION-REBUILD-MASTER 2026-06-11 · Phase 1
-- Per #27083 BUILD-ON-TOP + #27914 AUDIT-NOT-SWAP · us_* preserved untouched
-- Tables: atlas_arms, atlas_pages (tree), atlas_blocks (jsonb), atlas_projects, m2m, hermes_decisions
-- BlockNote stores doc as jsonb array of Block objects

-- ARMS · top-level workspaces
create table if not exists atlas_arms (
  slug text primary key,
  name text not null,
  emoji text default '📂',
  description text default '',
  order_idx int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- PAGES · the tree · infinite nest Notion-style
create table if not exists atlas_pages (
  id uuid primary key default gen_random_uuid(),
  arm_slug text not null references atlas_arms(slug) on delete cascade,
  parent_id uuid references atlas_pages(id) on delete cascade,
  title text not null default 'Untitled',
  emoji text default '📄',
  icon text,
  cover_url text,
  order_idx int default 0,
  view_type text default 'doc' check (view_type in ('doc','table','board','kanban','calendar','gallery')),
  archived boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists atlas_pages_arm_parent_idx on atlas_pages(arm_slug, parent_id, order_idx);
create index if not exists atlas_pages_parent_idx on atlas_pages(parent_id) where parent_id is not null;

-- BLOCKS · BlockNote-shaped content + native embeds (calendar/gmail/notebooklm/mcp/brain)
create table if not exists atlas_blocks (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references atlas_pages(id) on delete cascade,
  block_type text not null default 'native',
  content jsonb not null default '[]'::jsonb,
  props jsonb default '{}'::jsonb,
  order_idx int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by text default 'atlas'
);

create index if not exists atlas_blocks_page_idx on atlas_blocks(page_id, order_idx);
create index if not exists atlas_blocks_type_idx on atlas_blocks(block_type);

-- PROJECTS · Manager-page primitive (separate from us_projects · isolation)
create table if not exists atlas_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  emoji text default '📂',
  description text default '',
  priority text default 'P2' check (priority in ('P0','P1','P2')),
  status text default 'active' check (status in ('active','paused','done','archived')),
  arm_slugs text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- M2M pages and blocks for cross-arm copy-paste
create table if not exists atlas_project_pages (
  project_id uuid not null references atlas_projects(id) on delete cascade,
  page_id uuid not null references atlas_pages(id) on delete cascade,
  added_at timestamptz default now(),
  primary key (project_id, page_id)
);

create table if not exists atlas_project_blocks (
  project_id uuid not null references atlas_projects(id) on delete cascade,
  block_id uuid not null references atlas_blocks(id) on delete cascade,
  source_page_id uuid references atlas_pages(id) on delete set null,
  added_at timestamptz default now(),
  primary key (project_id, block_id)
);

-- HERMES_DECISIONS · cycle audit trail
create table if not exists atlas_hermes_decisions (
  id uuid primary key default gen_random_uuid(),
  arm_slug text references atlas_arms(slug) on delete set null,
  page_id uuid references atlas_pages(id) on delete set null,
  block_id uuid references atlas_blocks(id) on delete set null,
  decision_json jsonb not null,
  llm_model text,
  latency_ms int,
  created_at timestamptz default now()
);

create index if not exists atlas_hermes_arm_idx on atlas_hermes_decisions(arm_slug, created_at desc);

-- Auto-update updated_at triggers
create or replace function atlas_touch_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;

drop trigger if exists atlas_arms_touch on atlas_arms;
create trigger atlas_arms_touch before update on atlas_arms
  for each row execute function atlas_touch_updated_at();

drop trigger if exists atlas_pages_touch on atlas_pages;
create trigger atlas_pages_touch before update on atlas_pages
  for each row execute function atlas_touch_updated_at();

drop trigger if exists atlas_blocks_touch on atlas_blocks;
create trigger atlas_blocks_touch before update on atlas_blocks
  for each row execute function atlas_touch_updated_at();

drop trigger if exists atlas_projects_touch on atlas_projects;
create trigger atlas_projects_touch before update on atlas_projects
  for each row execute function atlas_touch_updated_at();

-- Seed arms · per CLAUDE.md 4-arm-MY-shape extended (8 arms + manager)
insert into atlas_arms (slug, name, emoji, description, order_idx) values
  ('curiosity', 'Curiosity', '🌱', 'What reaches outward · 9Q syntheses · pull-patterns', 1),
  ('pascal',    'Pascal',    '🤝', 'Coaching arc · clients · Monday calls · wow-moves', 2),
  ('research',  'Research',  '👁',  'Multi-angle 9Q · arxiv · sources · syntheses', 3),
  ('code',      'Code',      '✋', 'Commits · ships · build-on-top wins · 100PCT proofs', 4),
  ('infra',     'Infra',     '💗', 'LaunchAgents · hooks · scripts · daemons · health', 5),
  ('dream',     'Dream',     '🌙', 'F5 compose · arousal walks · felt-layer · LLM dreaming', 6),
  ('hermes',    'Hermes',    '🧠', 'Orchestration · decisions · meta-loop · self-improvement', 7),
  ('charle',    'Charle',    '💼', 'CB-Telecom + CM-Solution · light-touch · Yassine delegated', 8),
  ('manager',   'Manager',   '🎯', 'Cross-arm projects · copy-paste blocks · command center', 99)
on conflict (slug) do update set
  name = excluded.name, emoji = excluded.emoji, description = excluded.description;

-- RLS · enabled · permissive policies (cookie-gated at API layer · service-role bypasses)
alter table atlas_arms enable row level security;
alter table atlas_pages enable row level security;
alter table atlas_blocks enable row level security;
alter table atlas_projects enable row level security;
alter table atlas_project_pages enable row level security;
alter table atlas_project_blocks enable row level security;
alter table atlas_hermes_decisions enable row level security;

drop policy if exists "atlas_full_access" on atlas_arms;
drop policy if exists "atlas_full_access" on atlas_pages;
drop policy if exists "atlas_full_access" on atlas_blocks;
drop policy if exists "atlas_full_access" on atlas_projects;
drop policy if exists "atlas_full_access" on atlas_project_pages;
drop policy if exists "atlas_full_access" on atlas_project_blocks;
drop policy if exists "atlas_full_access" on atlas_hermes_decisions;

create policy "atlas_full_access" on atlas_arms for all using (true) with check (true);
create policy "atlas_full_access" on atlas_pages for all using (true) with check (true);
create policy "atlas_full_access" on atlas_blocks for all using (true) with check (true);
create policy "atlas_full_access" on atlas_projects for all using (true) with check (true);
create policy "atlas_full_access" on atlas_project_pages for all using (true) with check (true);
create policy "atlas_full_access" on atlas_project_blocks for all using (true) with check (true);
create policy "atlas_full_access" on atlas_hermes_decisions for all using (true) with check (true);
