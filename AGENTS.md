# 🤖 AGENTS.md — Guía para Agentes IA en el Proyecto ECA

> **Proyecto:** ECA — Estudio Creativo Agéntico (Creative Agentic Studio)
> **Repositorio:** `Agencia_Creativa_ECA/`
> **Ecosistema:** ALIHANED — Nave 1: I+D & Laboratorio

---

## 📌 Propósito del Proyecto

ECA es una plataforma SaaS multi-marca de producción creativa omnicanal con IA.
Coordina agentes especializados para transformar briefings e ideas en contenido
publicable en TikTok, Instagram, Facebook, YouTube y LinkedIn.

**Principio rector:** Soberanía Funcional Desacoplada — Eva (Directora Creativa)
opera de forma independiente del Laboratorio de Tony. Tony solo interviene como
soporte SRE / DevOps.

---

## 🏛️ Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│  Dokploy (dokploy-network + agent-net)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐            │
│  │  eca-web      │  │  eca-api      │  │ hermes-eva │            │
│  │  Next.js 15   │  │  FastAPI      │  │ (Hermes)   │            │
│  │  Puerto 3000  │  │  Puerto 8000  │  │ Telegram   │            │
│  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘            │
│         │                  │                │                    │
│  ┌──────┴──────────────────┴────────────────┴──────┐            │
│  │               Supabase (PostgreSQL + Auth)       │            │
│  └──────────────────────────────────────────────────┘            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │  Redis    │  │  MinIO   │  │  Postiz  │                      │
│  │  (Cola)   │  │  (S3)    │  │  (Social)│                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
└─────────────────────────────────────────────────────────────────┘
          ↕ ALiRouter (alirouter.alihaned.com:4000) — Inferencia LLM
          ↕ n8n — Automatización asíncrona
```

---

## 🛠️ Stack Técnico

### Frontend (`apps/web/`)
- **Framework:** Next.js 15 (App Router, TypeScript estricto)
- **Estilos:** Tailwind CSS v4 + shadcn/ui (tema personalizable por brand)
- **Iconos:** Lucide React
- **Estado:** Zustand (stores en `lib/stores/`)
- **Data Fetching:** TanStack Query v5
- **Chat IA:** AI SDK (`ai` npm) con streaming SSE
- **Canvas:** Fabric.js para previsualizador 1080×1920

### Backend (`apps/api/`)
- **Framework:** FastAPI (Python 3.12+, async)
- **ORM:** SQLModel (SQLAlchemy + Pydantic v2)
- **Base de Datos:** Supabase (PostgreSQL 16 gestionado, con RLS)
- **Cola:** Celery + Redis
- **Render:** Playwright (HTML→PNG) + FFmpeg (video)
- **Storage Temporal:** MinIO (S3-compatible para assets de render)

### Agentes (`apps/api/agents/` + `docker/Dockerfile.hermes`)
- **Runtime:** Hermes (contenedor `hermes-eva`)
- **Perfiles:** Eva (directora), Atlas (scout), Vera (scribe), Kite (dev), Orin (reach), Bibliotecario-Eva
- **Inferencia:** ALiRouter/LiteLLM (`https://alirouter.alihaned.com`)
- **MCP Server:** `packages/eca-mcp-server/` — herramientas A2A

---

## 📐 Convenciones de Código

### TypeScript (Frontend)
- `strict: true` en tsconfig.json — sin `any` excepto libs externas sin tipos
- Componentes: archivos `.tsx` con nombre PascalCase, export default
- Hooks: `use-*.ts` en `lib/hooks/`
- Stores Zustand: `*-store.ts` en `lib/stores/`
- Paths alias: `@/` = `apps/web/`

### Python (Backend)
- Tipado estricto con `mypy --strict`
- Docstrings Google-style en funciones públicas
- Modelos SQLModel en `app/models/` — un archivo por tabla
- Routers FastAPI en `app/routers/` — un archivo por recurso
- Services (lógica de negocio) en `app/services/`
- Workers Celery en `app/workers/` — una función por tarea

### Migraciones
- **Supabase Migrations** via `supabase db diff` + `supabase db push`
- Todas las migraciones versionadas en `supabase/migrations/`
- **RLS obligatorio:** Toda tabla con datos de usuario DEBE tener Row Level Security activado con policy de `workspace_id`

### Git
- Ramas: `main` (producción), `dev` (desarrollo), `feature/*`, `fix/*`
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`)
- PR obligatorio para merge a `main`

---

## 📁 Estructura del Monorepo

```
Agencia_Creativa_ECA/
├── apps/
│   ├── web/                        # Next.js 15 App Router
│   │   ├── app/                    # Rutas
│   │   │   ├── (dashboard)/        # Layout compartido del dashboard
│   │   │   │   ├── page.tsx        # Command Center
│   │   │   │   ├── workspaces/     # Gestión de workspaces
│   │   │   │   ├── brand-kit/      # Brand Kit & UGC
│   │   │   │   ├── studio/
│   │   │   │   │   ├── reels/      # Reels & Shorts 9:16
│   │   │   │   │   └── video/      # Long Video Studio
│   │   │   │   ├── calendar/       # Social Calendar & Postiz
│   │   │   │   └── connectors/     # Matrix de MCPs
│   │   │   ├── api/                # API Routes (proxy a FastAPI)
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── dashboard/          # Componentes de dashboard
│   │   │   ├── studio/             # Componentes del creative studio
│   │   │   ├── chat/               # Chat de Eva (AI SDK)
│   │   │   └── shared/             # Compartidos
│   │   ├── lib/
│   │   │   ├── api/                # Clients para FastAPI
│   │   │   ├── hooks/              # Custom hooks
│   │   │   ├── stores/             # Zustand stores
│   │   │   ├── supabase/           # Supabase client (server + browser)
│   │   │   └── utils/
│   │   └── public/
│   └── api/                        # FastAPI Backend
│       ├── app/
│       │   ├── main.py             # FastAPI app factory
│       │   ├── config.py           # Settings from env
│       │   ├── deps.py             # Dependencies (DB session, auth)
│       │   ├── models/             # SQLModel schemas
│       │   ├── routers/            # API endpoints
│       │   ├── services/           # Business logic
│       │   ├── workers/            # Celery tasks
│       │   └── agents/             # Eva agent profiles & orchestration
│       ├── alembic/                # DB migrations (if not using Supabase CLI)
│       ├── tests/
│       └── pyproject.toml
├── packages/
│   ├── templates/                  # Motor de templates HTML→PNG
│   │   ├── engine/                 # Renderer con Playwright
│   │   └── registry/               # Templates del reels-pack.json
│   ├── shared-types/               # TypeScript types compartidos
│   └── eca-mcp-server/             # MCP Server (A2A)
├── supabase/
│   ├── migrations/                 # SQL migrations versionadas
│   ├── seed.sql                    # Datos semilla para desarrollo
│   └── config.toml                 # Config del proyecto Supabase
├── docker/
│   ├── docker-compose.yml          # Stack completo para Dokploy
│   ├── docker-compose.dev.yml      # Override para dev local
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   └── Dockerfile.hermes
├── seed_references/                # Semillas originales (READ-ONLY, no modificar)
│   ├── cadence-prompts.md
│   └── reels-pack.json
├── .env.example
├── .gitignore
├── AGENTS.md                       # Este archivo
├── README.md
├── HANDOFF_CLAUDE_STITCH.md
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 🤖 Agentes de Eva (Ecosistema Alihas & Hermes)

> **Filosofía Alihas:** Se escribe con **H** porque el **Humano** es el centro absoluto (`Ali-H-as`).
> Alihas es el asistente personal agéntico universal para la diáspora basado en Hermes; Eva es su personificación como Directora Creativa de ECA.

| Perfil | Nombre Cadence | Rol |
|---|---|---|
| `orchestrator` | **Eva (Alihas)** | Directora Creativa. Coordina la cuadrilla con ruteo adaptativo. |
| `scout` | **Atlas** | Scout de ideas, tendencias y curaduría. |
| `scribe` | **Vera** | Copywriter, guionista y estructuradora de hooks. |
| `dev` | **Kite** | Director visual, prompter de video, templates 9:16. |
| `reach` | **Orin** | Estratega de publicación, despacho en Postiz. |
| `librarian` | **Bibliotecario-Eva** | Custodio del conocimiento, sync con Wiki. |

---

## ⚠️ Reglas Críticas para Agentes

1. **NUNCA modificar `seed_references/`** — Son semillas de referencia Clean-Room, inmutables.
2. **NUNCA hardcodear credenciales** — Todo secreto va en `.env` o Supabase Vault.
3. **RLS siempre activo** — Toda tabla con datos de usuario requiere política de `workspace_id`.
4. **Contenedor liviano** — `hermes-eva` y `eca-web` deben mantenerse < 500MB RAM cada uno.
5. **Render offloaded** — El trabajo pesado (FFmpeg, Playwright) corre en workers Celery, NUNCA en el proceso principal de FastAPI.
6. **Clean-Room** — Código derivado de `cadence-prompts.md` debe ser reescrito y adaptado, nunca copiado verbatim (licencia restrictiva del autor original).
7. **Conventional Commits** — Todo commit sigue `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
8. **Tests antes de merge** — Mínimo 80% cobertura en routers, validación de tipos en modelos.

---

## 🔗 Nodos del Grafo Corporativo Relacionados
- `knowledge_graph/ECA-Estudio-Creativo-Agentico.md` — Nota Obsidian del módulo
- `GRAFO_CORPORATIVO_ALIHANED.md` — Nodo raíz corporativo
- `HANDOFF_CLAUDE_STITCH.md` — Brief de diseño con Stitch para Claude

---

*Última actualización: 2026-11-06 | Autor: 🧠 Antigravity (Gemini)*
