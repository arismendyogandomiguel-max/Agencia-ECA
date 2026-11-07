# 🤝 HANDOFF MASTER BRIEF: REDISEÑO CON STITCH & CONSTRUCCIÓN DE ECA
> **De:** 🧠 Antigravity (Gemini) — Arquitecto Estratégico & Orquestador  
> **Para:** 🛠️ Claude (Extensión / Agente en IDE) — Constructor & Auditor de Código  
> **Proyecto:** ECA — Estudio Creativo Agéntico  
> **Repositorio Remoto:** https://github.com/arismendyogandomiguel-max/Agencia-ECA.git  
> **Ruta Local:** `C:\Users\jesus\OneDrive\Desktop\ALIHANED\AREA1-INVESTIGACIONyDESARROLLO\Agencia_Creativa_ECA`  

---

## 🎯 OBJETIVO DE LA MISIÓN
Tomar la semilla de **Cadence** (`seed_references/cadence-prompts.md` y `seed_references/reels-pack.json`) y elevarla a una plataforma corporativa multi-marca de nivel Enterprise: **ECA (Estudio Creativo Agéntico)**.

Utilizarás las herramientas de diseño generativo de Google (**Stitch / Generative UI**) para conceptualizar y maquetar la interfaz completa en **Next.js 14 + Tailwind CSS + Lucide**, y estructurarás el backend y el despliegue para **Dokploy**.

---

## 📐 ESPECIFICACIÓN DE PANELES PARA STITCH (DISEÑO GENERATIVO UI)

Debes generar o iterar mediante Stitch / Generative UI los siguientes 6 módulos centrales:

### 1. 🎛️ Command Center & Workspace Switcher
- Selector rápido de cliente/marca aislada (`Finanzas`, `E-Commerce`, `Marca Personal`, etc.).
- Tarjetas de estado de los agentes (Atlas, Vera, Kite, Orin, Hermes).
- Monitor de créditos de APIs (fal.ai, MiniMax, Alibaba Wan 2.1, Seedance, OpenAI/Codex).
- Feed de ejecuciones activas con barra de progreso.

### 2. 🎨 Brand Kit & UGC Asset Vault
- Configuración de identidad: logo, paleta primaria/secundaria, tipografías y reglas de voz.
- Gestión de avatares de marca (rostros consistentes para UGC).
- Catálogo de productos con imágenes de referencia y propuestas de valor para clips promocionales.

### 3. 📱 Reels & Shorts Creative Studio (9:16)
- Editor de guion con desglose por diapositivas/escenas (Hook, Desarrollo, Retención, CTA).
- Selector dinámico de plantillas derivado de `reels-pack.json` (Atlas, Syne, Fraunces, Minimalist Serif).
- Previsualizador en tiempo real a 1080x1920 con capas superpuestas (video de fondo + overlay HTML/tipografía + subtítulos sincronizados).

### 4. 🎞️ Long Video & Video Clips Studio (3 a 5+ min)
- Escaleta de contenido de múltiples bloques con guion narrativo continuo.
- Selector de voz neural (EdgeTTS / ElevenLabs) con control de ritmo.
- Generador de B-roll automático basado en prompts de IA enviados a APIs de video.
- Línea de tiempo visual interactiva de escenas.

### 5. 📅 Social Calendar & Postiz Hub
- Calendario editorial interactivo (mes / semana / día) con estados: *Borrador*, *En Revisión*, *Programado*, *Publicado*.
- Selector omnicanal con adaptación de copys y hashtags específicos para:
  - **TikTok**
  - **Instagram** (Reels & Carruseles)
  - **Facebook**
  - **YouTube** (Shorts & Videos Largos)
  - **LinkedIn** (Carruseles PDF & Posts)
- Integración con el contenedor interno de **Postiz** en Dokploy.

### 6. 🔌 Matrix de Conectores & MCPs
- Google Drive & Docs (sincronización de guiones y galería de assets).
- Google Calendar (sincronización bidireccional de fechas de publicación).
- Composio MCP (puente universal para APIs de terceros).
- n8n Webhook Listener para automatizaciones externas.

---

## 🛠️ ARQUITECTURA TÉCNICA Y MONOREPO REQUERIDO

```text
Agencia_Creativa_ECA/
├── apps/
│   ├── web/                     # Next.js 14 (App Router, Tailwind, Lucide, Radix/Shadcn)
│   │   ├── app/                 # Rutas: /workspaces, /studio, /reels, /calendar, /settings
│   │   ├── components/          # Componentes de diseño generados con Stitch
│   │   └── lib/                 # Clientes API y contratos
│   └── api/                     # FastAPI / Python
│       ├── routers/             # Generación de guiones, render, publicación
│       ├── agents/              # Subagentes ECA con ChatGPT/Codex router
│       └── workers/             # Tareas en segundo plano (FFmpeg, render)
├── packages/
│   ├── templates/               # Motor de templates HTML/SVG de reels-pack.json
│   └── shared-types/            # Tipos e interfaces comunes (TypeScript)
├── docker/
│   ├── docker-compose.yml       # Stack completo para Dokploy (Web + API + Redis + Postiz)
│   └── Dockerfile.*
├── seed_references/             # Semillas originales (Cadence prompts + reels pack)
└── .gitignore
```

---

## ⚡ REGLAS DE ORO PARA CLAUDE
1. **API Oficial Primero, Render Asíncrono:** La generación pesada de video se delega a APIs cloud; el render local con FFmpeg se gestiona mediante colas para no sobrecargar el VPS de Dokploy.
2. **Inferencia por Defecto:** Utilizar el endpoint de inferencia de ALIHANED (`https://alirouter.alihaned.com` / LiteLLM) o el canal de ChatGPT/Codex para las tareas de copywriting y guionización.
3. **Persistencia Dokploy:** Todo volumen persistente debe mapearse de forma limpia a `/opt/data/eca`.
