---
type: constitution
title: Agencia_Creativa_ECA — Constitution
description: Ratified architectural constitution for ECA (Estudio Creativo Agéntico) under rsc-harness v4.
tags: [sdd, constitution, eca, sovereign]
timestamp: 2026-11-07T20:10:00Z
topic: sdd
status: ratified
version: v1.0.0
---

# Agencia_Creativa_ECA — Constitution

> **RATIFICADA v1.0.0** — Base inmutable de arquitectura y gobernanza técnica para la construcción de ECA (Estudio Creativo Agéntico).

---

## Known facts

- **Goal:** ECA Estudio Creativo Agéntico: plataforma multi-marca soberana de generación de contenido audiovisual y monetización mediante agentes de IA autónomos con supervisión Human-in-the-Loop.
- **Triada de Constructores:**
  1. 🧠 **Antigravity (Gemini):** Arquitecto, planificador y diseñador de sistemas en el IDE local.
  2. 🛠️ **Claude:** Desarrollador y auditor de código local.
  3. ⚡ **Tony (Codex @ laboratorio.alihaned.com):** Ingeniero de backend en la nube a través de Hermes y la red segura Tailscale.
- **Workflow:** Vía A (Ágil) — desarrollo iterativo en rama `desarrollo`, validación estricta de compilación (`tsc --noEmit`), y merge directo a `main` con despliegue continuo en Vercel ([https://eca.alihaned.com](https://eca.alihaned.com)).

---

## 1. Stack Canon

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Lucide React, Zustand para estado client-side reactivo.
- **Backend & Almacenamiento Soberano:** Supabase Postgres con Row Level Security (RLS) estricto.
- **Orquestación en Nube:** Dokploy VPS (`100.66.184.126`), contenedor `mayordomia-hermes-eca` bajo la red privada `ecanet`.
- **Diseño de Interfaz:** Google Stitch Theme *Obsidian Kinetic* (Proyecto `15879021487220241211`).
- **Gobernanza:** `@ericrisco/rsc` v4.0.5 (ASDD & Gitmoji guards).

---

## 2. Quality Bar & Reglas Innegociables

1. **Cero Docker Local:** Ningún contenedor corre en la máquina local Windows; toda carga pesada y backend agéntico reside en Dokploy remoto.
2. **Cero Costo de Almacenamiento Propio:** El almacenamiento de video y assets pesados se canaliza directamente a Google Drive conectado del usuario vía conectores/plugins ("Gadgets del Esmoquin"), eliminando saturación de disco en VPS.
3. **Fallback Agéntico $0 Costo:** Para usuarios sin suscripciones pagas de Semrush o Google Trends, el motor de IA (Groq / Gemini Flash / Ollama) sintetiza matrices de tendencias sin bloquear el flujo.
4. **Estructura Estanca de 10 Pisos (Tabs):**
   - Piso 1: 🎛️ Command Center
   - Piso 2: 💡 Ideas & Tendencias Hub
   - Piso 3: 📱 Reels & Shorts Studio (9:16)
   - Piso 4: 🎞️ Long Video & Repurposing (YouTube 16:9 ➔ Clips)
   - Piso 5: 🎨 Brand Kit & Asset Vault (Zumo de Estilos & Dropshipping 1-Clic)
   - Piso 6: 📅 Social Calendar (Google Calendar Sync)
   - Piso 7: 🛡️ Aprobaciones Human-in-the-Loop (Gatekeeper)
   - Piso 8: 🔌 Gadgets del Esmoquin (James Bond Arsenal: Drive, Calendar, Semrush, Postiz)
   - Piso 9: 💰 Monetización & Creadores (PayPilot Escrow & UGC)
   - Piso 10: ⚡ Soberanía & Motor Agéntico (Hermes Dokploy & LLM Router)
5. **Nombres y Ortografía Corporativa Obligatoria:**
   - **Alihas** (con H intermedia).
   - **ALIHANED** (todo en mayúsculas).
   - **Eva** (Orquestadora y Mayordoma creativa).

---

## 3. UX / Accessibility Floor

- Paleta Obsidian Kinetic: Fondo `#09090b`, paneles `#18181b`, bordes `#27272a`, acentos en violeta y esmeralda.
- Sidebar colapsable con modo sólo iconos (`w-16`) sin salto de ancho al hacer hover; tooltips flotantes (`z-50`).
- Avatar de usuario fijo en la esquina inferior izquierda con popover interactivo (Perfil, Cuenta, Plan, Logout).
- Modales accesibles y badges de estado en tiempo real.

---

## 4. Branching & Shipping (Vía A)

- Rama de trabajo activo: `desarrollo`.
- Tras validar cada piso con `tsc --noEmit`, merge a `main` y push a ambos remotos.
- Vercel CI/CD despliega automáticamente en producción en `eca.alihaned.com`.

---

## Definition of Done (DoD)

- [ ] Cero errores de TypeScript (`tsc --noEmit`).
- [ ] Especificación de piso documentada o validada en Stitch.
- [ ] Componente testeado en navegador o dev preview.
- [ ] Commit con convención Gitmoji validado por `asdd-gate`.
- [ ] Despliegue en `eca.alihaned.com` verificado vía HTTP 200.

---

## Amendment Log (Append-only)

| Fecha | Versión | Autor | Cambio |
|---|---|---|---|
| 2026-11-07 | v1.0.0 | Orquestador & Arismendy Ogando | Ratificación oficial de la Constitución SDD de ECA. |
