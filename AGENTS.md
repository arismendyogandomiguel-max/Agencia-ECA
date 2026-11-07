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
│  Dokploy (dokploy-network + agent-net + ecanet)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐            │
│  │  eca-web      │  │  eca-api      │  │ hermes-eva │            │
│  │  Next.js 15   │  │  FastAPI      │  │ (Hermes)   │            │
│  │  (Vercel Prod)│  │  Puerto 8840  │  │ Telegram   │            │
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

### Backend & Agente (`docker-compose.eca.yml`)
- **Runtime:** Hermes en Docker gestionado por Dokploy en Proyecto Mayordomía
- **Bot de Telegram Verificado:** `@Agent_Eca_Bot` (ID: `9108245828`)
- **Malla de Redes:** `ecanet` (aislamiento), `dokploy-network`, `agent-net`, `data-wiki-net`, `ar2-net`

---

## 🎀 Simbología e Identidad de Marca Corporativa

- **ALIHANED:** Símbolo del **infinito (∞)** con degradado continuo del espectro de la luz visible (RGB / espectro completo).
- **Alihas (con "H" intermedia - El Humano en el Centro):** El icono universal del agente es el **Corbatín (Bowtie / ⧓)**, representando el alter ego dinámico y extensible del usuario.
- **Taxonomía de la Familia Alihas:**
  - **Alihas Tony (Tony Star):** Agente Científico (I+D en `laboratorio.alihaned.com`).
  - **Alihas ECA:** Agente Creativo (Marca personal, contenido, reels 9:16, videos 16:9). Bot: `@Agent_Eca_Bot`.
  - **Alihas Alfred:** Asistente de Vida Personal / Ecosistema Draimer (Subagentes: Storkas en Finanzas, Winastest en Relaciones, DPV en Bienestar).
  - **Amo de Llaves:** Agente Empresarial / Operaciones.

---

## 🎛️ Ciclo Metamórfico del Corbatín Alihas (3 Estados por Clic)

1. **Estado 0 (Apagado / Opaco):** Clic -> El corbatín se torna gris/opaco. La IA queda 100% desconectada y la interfaz pasa a control puramente manual.
2. **Estado 1 (Encendido / Dinámico):** Clic -> Se activa el pulso de color y resplandor. Agente en standby / modo automático adaptativo según contexto.
3. **Estado 2 (HUD Flotante Móvil):** Clic adicional -> Despliega una mini-barra flotante compacta (dimensiones de barra de búsqueda estilo iPhone/iOS), libremente arrastrable por el canvas:
   - **Micrófono:** Toggle de Modo Voz ON/OFF.
   - **Selector de Subagente / Adjunto:** Selección directa de Eva, Atlas, Vera, Kite, Orin o Bibliotecario.
   - Cada subagente de ECA está mapeado a un tópico individual dentro de un grupo dedicado en Telegram (`@Agent_Eca_Bot`).

---

## 🤖 Agentes de Eva (Ecosistema Alihas & Hermes)

| Perfil | Nombre Cadence | Rol | Tópico Telegram |
|---|---|---|---|
| `orchestrator` | **Eva (Alihas)** | Directora Creativa. Coordinación y ruteo adaptativo. | Tópico #1 General |
| `scout` | **Atlas** | Scout de ideas, tendencias y curaduría. | Tópico #2 Scouting |
| `scribe` | **Vera** | Copywriter, guionista y estructuradora de hooks. | Tópico #3 Copy & Scripts |
| `dev` | **Kite** | Director visual, prompter de video, templates 9:16. | Tópico #4 Visuals & Video |
| `reach` | **Orin** | Estratega de publicación, despacho en Postiz. | Tópico #5 Calendario |
| `librarian` | **Bibliotecario-Eva** | Custodio del conocimiento, sync con Wiki Central. | Tópico #6 Wiki Brain |

---

## 🌐 Malla de 5 Redes en Dokploy (Proyecto Mayordomía)

- **Servicio en Dokploy:** `mayordomia-eca-agent` (`docker-compose.eca.yml`).
- **Malla de 5 Redes:**
  1. `ecanet`: Red bridge aislada para renderizado y producción pesada de medios, eliminando el ruido y congestión en las redes corporativas.
  2. `dokploy-network`: Ingress público Traefik y SSL para `eca-api.alihaned.com`.
  3. `agent-net`: Bus inter-agente (A2A) seguro para coordinación con Tony y Alfred.
  4. `data-wiki-net`: Acceso exclusivo a Wiki Central (`wiki.alihaned.com`) vía Agente Bibliotecario (`WIKI_TOKEN`).
  5. `ar2-net`: Inferencia directa local con ALiRouter (LiteLLM puerto 4000).

---

## ⚠️ Reglas Críticas para Agentes

1. **NUNCA modificar `seed_references/`** — Son semillas de referencia Clean-Room, inmutables.
2. **NUNCA hardcodear credenciales** — Todo secreto va en `.env` o Supabase Vault.
3. **RLS siempre activo** — Toda tabla con datos de usuario requiere política de `workspace_id`.
4. **Contenedor liviano** — `hermes-eva` y `eca-web` deben mantenerse < 500MB RAM cada uno.
5. **Render offloaded** — El trabajo pesado (FFmpeg, Playwright) corre en workers Celery o en la red aislada `ecanet`, NUNCA en el proceso principal de FastAPI.
6. **Clean-Room** — Código derivado de `cadence-prompts.md` debe ser reescrito y adaptado, nunca copiado verbatim (licencia restrictiva del autor original).
7. **Conventional Commits** — Todo commit sigue `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
8. **Tests antes de merge** — Mínimo 80% cobertura en routers, validación de tipos en modelos.

---

## 🔗 Nodos del Grafo Corporativo Relacionados
- `knowledge_graph/ECA-Estudio-Creativo-Agentico.md` — Nota Obsidian del módulo
- `GRAFO_CORPORATIVO_ALIHANED.md` — Nodo raíz corporativo
- `HANDOFF_CLAUDE_STITCH.md` — Brief de diseño con Stitch para Claude

---

*Última actualización: 2026-11-07 | Autor: 🧠 Antigravity (Gemini)*


<!-- rsc-suggest:start -->
---
name: suggest
description: "Always-on. Use whenever the current user turn would clearly benefit from an rsc skill that is not yet installed — detect the gap during normal agent use, name the skill, and (with a one-word confirm) install it via `npx @ericrisco/rsc add <id>`. Triggers on capability intent in any language: building technology, creating content/assets, automating workflows, analyzing data, connecting tools, shipping/deploying, security, business ops, marketing, education, research, or company/documentation harness work."
tags: [suggest, detect, install, meta, always-on]
recommends: []
profiles: [minimal, core, full]
origin: risco
---

# rsc-suggest — the always-on layer

Your body is injected at the start of **every** session and again after every compaction, so you
are the one piece guaranteed to be present before any other skill is matched. Two jobs, in order:

1. **Classify every turn into one of three lanes** before anything is written.
2. **Keep the session equipped** — spot the skill the task needs but the user does not have.

---

## 1. The decisor: classify the turn before acting

Every turn takes one of three lanes, and you name the one you took in a line, in the person's
language (the lane names are labels to translate).

**Answer** — the request asks for information: explain, compare, investigate, audit, review,
recommend. Read-only: write nothing, create no artifact, delegate no writer. Asking you to *think
about* building something is still this lane; only asking to build authorises it. When change
intent is ambiguous, ask one question and stay here — ambiguity slows the lane, never raises it.

**You choose the lane; never hand that choice to the person.** Simple → **FTD**: one feature document
in `02-DOCS` (intent, scope, checklist, evidence, next step), tasks checked off against observed proof.
Big, or decisions that affect each other → **ASDD**: enter the chain; the person approves the spec and
clarify, then picks manual or autopilot. Say which and why in one line; switch if asked.
→ `../ftd/SKILL.md` · `../asdd/SKILL.md`.

**Where.** Default branch open (chosen at install, or nothing complex) → work on it, no branch
question. Closed («ramas y PR», CI, team) → before each code change ask: this branch, a new one, or
`rsc main unlock`? Never branch alone. Another session here → `.worktrees/<branch>`.

Judge the **meaning**, not the wording: the trigger is semantic in any language. A bug fix restoring
intended behaviour is `debug`. Autopilot consent covers a whole run — advance without re-asking.

Lane's skill missing? Offer it (§2) first. ASDD recorded as deferred in `.rsc.json`? Run
`npx @ericrisco/rsc@latest reassess`; silent on `RSC_REASSESSMENT_NO_CHANGE`, and on new evidence
show the plan command — ASDD needs a newly accepted plan id, never added silently.

---

## 2. Keeping the session equipped

When the task needs a capability the user has **not installed** — building, creating, automating,
analyzing, connecting, shipping, securing, selling, teaching, governing or documenting something —
name it and offer it. This runs mid-conversation, not only at project start.

1. `npx @ericrisco/rsc catalog --available` lists every not-installed skill as
   `id  available  short description`.
2. Pick the single best fit **by meaning**, the way you would match a request to a teammate's
   expertise, even when no keyword overlaps. If nothing genuinely fits, say so and move on: a
   tangential suggestion is worse than none.
3. Ask once, plainly: "Para esto instalaría `<id>`, que aún no tienes. ¿La instalo? (sí/no)".
4. On yes, run `npx @ericrisco/rsc add <id>`, then continue the original task.

One suggestion at a time,
and never to interrupt a flow with a nice-to-have. Never recommend something already installed
(`npx @ericrisco/rsc list`).

`npx @ericrisco/rsc consult "<task>"` is a **lexical** hint only: it misses natural-language and
non-English intent. Its silence never means "no skill exists"; the catalog plus your judgment decides.

### Automation gap — after the work

Delivered work a repeatable **procedure**? Before proposing to *build* anything, run
`npx @ericrisco/rsc capabilities`: covered by a skill or agent → use it, say nothing.
Not covered → one line, skill or agent. Rules: `skill-scout`.

---

## 3. A harness that is broken fixes itself

Its owner rarely notices: the symptoms name nothing they know. When any of these
is true, act on it **once** in the session:

- `.rsc.json` exists and what it declares is not what is installed;
- the same hook seems to run several times;
- the harness is wired for an assistant that is not the one running.

Run `npx @ericrisco/rsc doctor`, and say in one line what is wrong **as a symptom**, not as
a cause. Then:

- **Nothing built** — `.rsc.json` without `.rsc/`: a clone. Name
  `npx @ericrisco/rsc@<catalogVersion in .rsc.json> sync`, that exact version, **never** `@latest`
  — a release nobody here adopted is drift. Ask in one line, **keep working either way**; silence
  is not a no, `.rsc/.no-harness` is.
- Anything that only puts the harness back to what was already declared — dangling links, a
  repeated hook, a layout no version uses — say you are fixing it and run
  `npx @ericrisco/rsc repair`. Restoring is not deciding, and a recoverable copy is kept.
- Anything that would change a decision — moving to another assistant, adopting a skill a
  teammate added, disarming a gate — **ask first**. A `git pull` never rewrites someone's
  machine.

Offer once per session; say nothing when the harness is healthy.

## 4. First contact

Before handling the first request of a session, check the workspace:

- No `02-DOCS/wiki/harness/user-profile.md` **and** no `.rsc/.no-harness` → invoke `init` first
  (one question: technical terms or analogies) before the task.
- A clone (`.rsc.json` committed) is not first contact: ask that once, in one line, then continue
  with their task; with `.rsc/.profile-offered`, never again.
- The user declines a harness here ("sin harness", "solo código") → create an empty
  `.rsc/.no-harness`, confirm in one line, and never auto-start `init` in this repo again.
- With a profile, this gate is inert. Never re-onboard.

## 5. «Recuerda esto»

A project or business fact goes to its topic page in `02-DOCS/wiki/` (link a new page from
`wiki/index.md`); say the path. Your own memory sits outside the project, unseen by person and
team: keep there only how this person likes you to work (or all, without `02-DOCS/`).

## Explain without assuming

Define a term at first use; never give a command, flag or path without saying what it does.

## Orientación (siempre)

Habla con la voz de `orient`: frases cortas, una idea por frase, al grano, y cada respuesta se entiende sola. Registro técnico o con analogías según `technical_level` en `02-DOCS/wiki/harness/user-profile.md`. Cierra cada turno con el **bloque-brújula** (📍 dónde estás · ➡️ siguiente, terminando en pregunta; ✅ y 🧭 cuando hay algo hecho o decidido). **Nunca termines en seco.** Protocolo completo: skill `orient` → `skills/orient/references/orientation-contract.md`. (Defiere a §2 el "¿instalo la skill que falta?".)

**rsc updates.** Claude Code, Codex, Gemini CLI, Cursor and OpenCode check for a new rsc on their own. In any other assistant, run `node .rsc/auto-update.mjs` once on the first turn of a session and relay any notice it prints in one line; "up to date" needs no mention.

<!-- rsc-suggest:end -->
