# 🎬 ECA — Estudio Creativo Agéntico (Creative Agentic Studio)
> **Ecosistema ALIHANED | Nave 1: I+D & Laboratorio Periférico**  
> *SaaS / App Periférica Multi-Marca para Generación, Edición y Publicación de Contenido Omnicanal con IA.*

---

## 📌 Visión del Proyecto
**ECA (Estudio Creativo Agéntico)** es una plataforma integral de producción creativa multi-marca y multi-formato, desplegable en **Dokploy** vía Docker Compose / GitHub, conectada al bus de inferencia y automatización de ALIHANED.

Coordina agentes especializados para transformar briefings, ideas de marca y activos en piezas de contenido listas para publicación:
- **Formatos:** Texto, Imágenes, Infografías, Reels (9:16), Shorts, Video Clips y Videos Largos (3 a 5+ min).
- **Redes Soportadas:** TikTok, Instagram, Facebook, YouTube, LinkedIn.

---

## 🏛️ Módulos Centrales
1. **Multi-Workspace & Cuentas Sociales:** Aislamiento total de marcas, clientes y credenciales.
2. **Brand Kit & UGC:** Logos, paletas, fuentes, avatares, guías de tono y assets de producto.
3. **Generación & Pipeline Editorial:**
   - Guiones y hooks estructurados.
   - Generación de imágenes (Flux, Imagen 3, Qwen-Image).
   - Generación de video con APIs externas (fal.ai, Seedance / Wan 2.1, Alibaba, MiniMax, Kling).
   - Render automatizado con FFmpeg y plantillas HTML/Canvas (remix de templates tipo Cadence/Reels).
4. **Social Publisher & Calendario:**
   - Integración nativa con **Postiz** (instancia Docker interna en Dokploy) para publicación sin bloqueos ni scrapers frágiles.
   - Buffer / API fallback.
5. **Conectividad & MCPs:**
   - Google Drive, Google Docs, Google Calendar (vía MCP oficial).
   - Composio MCP para integraciones de herramientas externas.
   - n8n backend para flujos asíncronos y webhooks.
6. **Agente ECA con autenticación ChatGPT / Codex por defecto:**
   - Conectado a la inferencia del Laboratorio Tony (`alirouter.alihaned.com` / LiteLLM).

---

## 🚀 Despliegue en Dokploy
- **Red Dokploy:** `dokploy-network` (Ingress Traefik con SSL automático).
- **Persistencia:** Volúmenes Docker mapeados a `/opt/data/eca`.
- **Modo de Despliegue:** GitHub Auto-Deploy en Dokploy.

---

*Estado: #status/planned | Diseñado por: 🧠 Antigravity (Gemini)*

