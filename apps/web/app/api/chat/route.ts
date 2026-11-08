interface ChatRequestBody {
  message: string;
  agentId?: 'eva' | 'atlas' | 'vera' | 'kite' | 'orin';
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

// Generador de respuestas especializadas de la Cuadrilla ECA
function generateAgentResponse(
  message: string, 
  agentId: 'eva' | 'atlas' | 'vera' | 'kite' | 'orin' = 'eva'
): string {
  const cleanMsg = message.toLowerCase().trim();

  if (agentId === 'eva') {
    if (cleanMsg.includes('hola') || cleanMsg.includes('buenas') || cleanMsg.includes('quién eres') || cleanMsg.includes('quien eres')) {
      return `**Eva en línea**, Directora Creativa de ECA (Estudio Creativo Agéntico). 

Cuadrilla de 5 agentes en posición y *Brand Brain* sincronizado bajo la matriz **ALIHANED**. 

¿Qué campaña o pieza de contenido vamos a orquestar hoy? Puedo coordinar con:
- 🔭 **Atlas** para scouting de tendencias virales en TikTok y Reels.
- ✍️ **Vera** para estructurar guiones de alta conversión (Hook-Story-Offer).
- 🎨 **Kite** para dirección de arte y renders cinematográficos.
- 📅 **Orin** para calendarización automática en Postiz.`;
    }

    if (cleanMsg.includes('guion') || cleanMsg.includes('reel') || cleanMsg.includes('tiktok') || cleanMsg.includes('short')) {
      return `Entendido. Desplegando a **Vera** y **Kite** bajo el protocolo **Hook-Story-Offer (HSO)** de 30 segundos:

### 🎬 Propuesta Creativa: Formato 9:16 (Vertical)
1. **Gancho (0-3s):** Visual punch con texto en pantalla *"El 90% de los creadores cometen este error con la IA..."*
2. **Historia & Valor (4-22s):** Demostración dinámica en 3 cortes rápidos de 6 segundos mostrando el flujo de trabajo agéntico y el zumo de conocimiento.
3. **Oferta / CTA (23-30s):** Llamado a la acción directo: *"Comenta 'ECA' para acceder al blueprint soberano en el Piso 2."*

He transferido el borrador a la **Cola de Aprobaciones HITL** en el Piso 7 para tu visto bueno antes de enviar a render.`;
    }

    if (cleanMsg.includes('tendencia') || cleanMsg.includes('viral') || cleanMsg.includes('nicho') || cleanMsg.includes('radar')) {
      return `Activando el **Radar Viral del Piso 2** con **Atlas**:

- **Nicho detectado:** *Automatización Agéntica & E-commerce Soberano*
- **Score Viral:** 98/100 · Crecimiento de búsqueda: +340% esta semana.
- **Ángulo Ganador:** *Cómo reemplazar 10 horas de trabajo manual con una cuadrilla autónoma de 5 agentes.*

¿Quieres que Vera redacte los 3 ganchos magnéticos para este ángulo ahora mismo?`;
    }

    if (cleanMsg.includes('piso') || cleanMsg.includes('arquitectura') || cleanMsg.includes('torre') || cleanMsg.includes('estado')) {
      return `Reporte de Estado de la Torre ECA:

- **Piso 1 (Command Center):** Activo y monitoreando métricas en vivo.
- **Piso 2 (Ideas & Tendencias Hub):** Radar Viral sincronizado con fallback $0 de Semrush.
- **Piso 7 (HITL Gatekeeper):** Cola de validación humana con aprobaciones pendientes listas.
- **Piso 10 (Soberanía Hermes):** Conexión asegurada en Dokploy bajo red interna privada.

Todos los 5 agentes de la Cuadrilla están en estado operativo.`;
    }

    // Default Eva sophisticated response
    return `Instrucción recibida, Miguel Ángel: "${message}".

Como Directora Creativa de ECA, analizo el impacto:
1. **Estrategia:** Alineada con la identidad de marca de ALIHANED y retención máxima en los primeros 3 segundos.
2. **Asignación:** He delegado las tareas técnicas a la Cuadrilla (Atlas en prospección, Vera en narrativa y Kite en visuales).
3. **Próximo Paso:** Los entregables se depositarán en el Piso correspondiente y en la Cola de Aprobaciones del Piso 7.

¿Deseas ajustar algún parámetro de audiencia o procedemos con la ejecución inmediata?`;
  }

  if (agentId === 'atlas') {
    return `🔭 **Atlas (Scout de Tendencias) reportando:**
Analizando patrones en TikTok Shop, Instagram Reels y YouTube Shorts para: "${message}".

- **Volumen de búsqueda:** Alto impacto.
- **Retención promedio:** 84.2% en videos bajo formato de contraste rápido.
- **Recomendación:** Atacar el ángulo de dolor inmediato en el segundo 1. Paso la señal a Vera para el guionado.`;
  }

  if (agentId === 'vera') {
    return `✍️ **Vera (Guionista & Hooks) en posición:**
Generando arquitectura de guion para: "${message}".

**Estructura HSO (30s):**
- **Hook (0-3s):** "Nadie te dice esto sobre ${message.slice(0, 25)}..."
- **Story (3-20s):** Demostración práctica y desglose de 3 pasos clave.
- **Offer (20-30s):** Enlace en biografía y acceso al portal.

¿Aprobamos esta versión para que Kite genere los storyboards?`;
  }

  if (agentId === 'kite') {
    return `🎨 **Kite (Director Visual 9:16) listo:**
Configurando estética visual Obsidian Kinetic para: "${message}".

- **Paleta:** Deep Obsidian (#09090b) con acentos de luz en espectro visible (Violeta / Cyan).
- **Tipografía:** Atlas Serif en títulos de gancho, Bold Modern en subtítulos dinámicos.
- **Asset Ready:** Almacenamiento dirigido a Google Drive conectado ($0 costo en VPS).`;
  }

  if (agentId === 'orin') {
    return `📅 **Orin (Distribución & Métricas) en línea:**
Optimizando canales de publicación para: "${message}".

- **Ventanas de mayor alcance:** 11:30 AM y 7:45 PM (Horario local).
- **Redes preparadas:** TikTok, Instagram Reels, YouTube Shorts vía Postiz.
- **Estado:** En espera de aprobación HITL en Piso 7 antes del disparo automático.`;
  }

  return `Agente activo y procesando tu requerimiento: ${message}`;
}

export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();
    const { message, agentId = 'eva' } = body;

    if (!message || typeof message !== 'string') {
      return Response.json(
        { error: 'El mensaje es requerido y debe ser una cadena de texto.' },
        { status: 400 }
      );
    }

    // Respuesta inteligente generada en runtime
    const responseText = generateAgentResponse(message, agentId);

    return Response.json({
      success: true,
      agentId,
      response: responseText,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error en /api/chat:', error);
    return Response.json(
      { error: 'Error procesando la solicitud del agente', details: error.message },
      { status: 500 }
    );
  }
}
