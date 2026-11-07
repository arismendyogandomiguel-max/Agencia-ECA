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
