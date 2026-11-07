-- ═══════════════════════════════════════════════════════════════
-- ECA STUDIO — Core Database Migration (Supabase / Postgres 16)
-- Multi-Tenant con UUIDv7, RLS por Workspace y Tablas Agénticas
-- ═══════════════════════════════════════════════════════════════

-- 1. Habilitar extensiones requeridas
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- 2. Esquema privado para funciones de seguridad RLS
create schema if not exists private;

-- 3. Tabla: Organizaciones (SaaS Commercial / Multi-Tenant Root)
create table if not exists public.organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  owner_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_tier text not null default 'free' check (plan_tier in ('free', 'creator', 'pro', 'agency', 'enterprise_internal')),
  credits_balance numeric(10, 2) not null default 0.00,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Tabla: Workspaces (Aislamiento de Marca)
create table if not exists public.workspaces (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  owner_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug)
);
create index if not exists idx_workspaces_org on public.workspaces(organization_id);

-- 5. Tabla: Miembros del Workspace (Para RLS)
create table if not exists public.workspace_members (
  id bigint generated always as identity primary key,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member', 'viewer')),
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);
create index if not exists idx_workspace_members_user on public.workspace_members(user_id);
create index if not exists idx_workspace_members_ws on public.workspace_members(workspace_id);

-- 6. Función Helper RLS: user_workspace_ids
create or replace function private.user_workspace_ids()
returns setof uuid
language sql
security definer
set search_path = ''
stable
as $$
  select workspace_id
  from public.workspace_members
  where user_id = (select auth.uid())
$$;

revoke execute on function private.user_workspace_ids() from public, anon, authenticated;
grant execute on function private.user_workspace_ids() to authenticated;

-- 7. Tabla: Brand Brain Docs (Grafo Markdown por Workspace)
create table if not exists public.brand_brain_docs (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  filename text not null,
  title text not null,
  frontmatter jsonb default '{}'::jsonb,
  content text not null,
  tags text[] default array[]::text[],
  updated_by_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, filename)
);
create index if not exists idx_brand_brain_ws on public.brand_brain_docs(workspace_id);

-- 8. Tabla: Ideas (Atlas Scout Agent)
create table if not exists public.ideas (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  angle text not null,
  format text not null default 'reel_9_16' check (format in ('reel_9_16', 'carousel', 'long_video', 'post')),
  rationale text,
  source text not null default 'Atlas',
  status text not null default 'proposed' check (status in ('proposed', 'promoted', 'dismissed')),
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_ideas_ws on public.ideas(workspace_id);

-- 9. Tabla: Drafts (Contenido en Producción)
create table if not exists public.drafts (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  idea_id uuid references public.ideas(id) on delete set null,
  title text not null,
  caption text,
  hashtags text[] default array[]::text[],
  template_id text not null default 'reel-atlas',
  status text not null default 'writing' check (status in ('writing', 'review', 'fitting', 'fitted', 'designing', 'ready', 'publishing', 'published', 'error')),
  postiz_post_id text,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_drafts_ws on public.drafts(workspace_id);
create index if not exists idx_drafts_status on public.drafts(status);

-- 10. Tabla: Slides (Escenas desglosadas para el Canvas)
create table if not exists public.slides (
  id bigint generated always as identity primary key,
  draft_id uuid not null references public.drafts(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  idx smallint not null default 0,
  kicker text,
  title text not null,
  body text,
  template_id text,
  media_url text,
  higgsfield_prompt text,
  created_at timestamptz not null default now()
);
create index if not exists idx_slides_draft on public.slides(draft_id);
create index if not exists idx_slides_ws on public.slides(workspace_id);

-- 11. Tabla: Runs (Telemetría y Registro Agéntico)
create table if not exists public.runs (
  id bigint generated always as identity primary key,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  agent_name text not null,
  task_description text not null,
  model_used text,
  tokens_input integer default 0,
  tokens_output integer default 0,
  cost_usd numeric(8, 5) default 0.00000,
  status text not null default 'completed' check (status in ('running', 'completed', 'failed')),
  error_message text,
  created_at timestamptz not null default now()
);
create index if not exists idx_runs_ws on public.runs(workspace_id);
create index if not exists idx_runs_agent on public.runs(agent_name);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ═══════════════════════════════════════════════════════════════

alter table public.workspaces enable row level security;
create policy "ws_access" on public.workspaces
  for all to authenticated
  using ( id in (select private.user_workspace_ids()) )
  with check ( id in (select private.user_workspace_ids()) );

alter table public.brand_brain_docs enable row level security;
create policy "brand_brain_access" on public.brand_brain_docs
  for all to authenticated
  using ( workspace_id in (select private.user_workspace_ids()) )
  with check ( workspace_id in (select private.user_workspace_ids()) );

alter table public.ideas enable row level security;
create policy "ideas_access" on public.ideas
  for all to authenticated
  using ( workspace_id in (select private.user_workspace_ids()) )
  with check ( workspace_id in (select private.user_workspace_ids()) );

alter table public.drafts enable row level security;
create policy "drafts_access" on public.drafts
  for all to authenticated
  using ( workspace_id in (select private.user_workspace_ids()) )
  with check ( workspace_id in (select private.user_workspace_ids()) );

alter table public.slides enable row level security;
create policy "slides_access" on public.slides
  for all to authenticated
  using ( workspace_id in (select private.user_workspace_ids()) )
  with check ( workspace_id in (select private.user_workspace_ids()) );

alter table public.runs enable row level security;
create policy "runs_access" on public.runs
  for all to authenticated
  using ( workspace_id in (select private.user_workspace_ids()) )
  with check ( workspace_id in (select private.user_workspace_ids()) );
