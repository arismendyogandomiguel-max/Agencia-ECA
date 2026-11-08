'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Paperclip, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Radio, 
  ChevronDown, 
  X, 
  Sparkles,
  Bot,
  Copy,
  Check,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { AlihasTuxedoAvatar } from './ali-bowtie-avatar';

interface AgentOption {
  id: 'eva' | 'atlas' | 'vera' | 'kite' | 'orin';
  name: string;
  role: string;
  color: string;
  badgeColor: string;
}

const AGENTS: AgentOption[] = [
  { id: 'eva', name: 'Eva', role: 'Directora & Orquestadora', color: 'text-violet-400', badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20' },
  { id: 'atlas', name: 'Atlas', role: 'Estratega & Tendencias', color: 'text-cyan-400', badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
  { id: 'vera', name: 'Vera', role: 'Guionista & Hooks 3s', color: 'text-pink-400', badgeColor: 'bg-pink-500/10 text-pink-300 border-pink-500/20' },
  { id: 'kite', name: 'Kite', role: 'Director Visual 9:16', color: 'text-amber-400', badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  { id: 'orin', name: 'Orin', role: 'Distribución & Postiz', color: 'text-emerald-400', badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
];

const SUGGESTIONS = [
  'Estructurar guion Reel 9:16 (30s)',
  'Radar de tendencias virales',
  'Estado de la Torre y Piso 1',
  'Revisar cola de aprobaciones HITL'
];

interface ChatMessage {
  id: string;
  sender: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export const AliFloatingHUD: React.FC = () => {
  const [hudMode, setHudMode] = useState<'text' | 'voice'>('text');
  const [selectedAgent, setSelectedAgent] = useState<AgentOption>(AGENTS[0]);
  const [isAgentMenuOpen, setIsAgentMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  
  // Chat & Response states
  const [isThinking, setIsThinking] = useState(false);
  const [isResponseCardOpen, setIsResponseCardOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Voice controls
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isDictating, setIsDictating] = useState(false);

  // Live response demo for voice mode
  const [voiceDisplayFeed, setVoiceDisplayFeed] = useState<string>(
    'Eva conectada. Directora Creativa de ECA. Cuadrilla en posición y Brand Brain sincronizado.'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isResponseCardOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isResponseCardOpen]);

  // Voice synthesis helper
  const speakText = (text: string) => {
    if (isSpeakerMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Limpiar markdown básico para voz
      const cleanVoiceText = text.replace(/[*_#`>-]/g, '').slice(0, 300);
      const utterance = new SpeechSynthesisUtterance(cleanVoiceText);
      utterance.lang = 'es-ES';
      utterance.rate = playbackSpeed;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  };

  // Toggle voice playback speeds
  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const handleSend = async (overridePrompt?: string) => {
    const query = (overridePrompt || inputText).trim();
    if (!query || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'Tú',
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);
    setIsResponseCardOpen(true);
    setVoiceDisplayFeed(`[${selectedAgent.name}] Pensando: "${query}"...`);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          agentId: selectedAgent.id
        })
      });

      const data = await res.json();
      const responseText = data.response || `[${selectedAgent.name}] Procesado correctamente.`;

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: selectedAgent.name,
        role: 'agent',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, agentMsg]);
      setVoiceDisplayFeed(responseText);

      // Si estamos en modo voz, reproducir síntesis
      if (hudMode === 'voice') {
        speakText(responseText);
      }
    } catch (error) {
      console.error('Error enviando mensaje al agente:', error);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: selectedAgent.name,
        role: 'agent',
        text: 'Ocurrió un error conectando con el servicio del agente. Revisa la consola o intenta nuevamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-auto">
      
      {/* ─── VISOR FLOTANTE DE RESPUESTA / CONSOLA DE DIÁLOGO AGÉNTICO ─── */}
      {isResponseCardOpen && (
        <div className="mb-3 bg-[#0d0d12]/95 backdrop-blur-2xl border border-violet-500/40 rounded-2xl shadow-2xl shadow-violet-950/60 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header de la Consola */}
          <div className="px-4 py-2.5 bg-[#121217] border-b border-[#27272a] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isThinking ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span className="font-bold text-white flex items-center gap-1.5">
                {selectedAgent.name} 
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${selectedAgent.badgeColor}`}>
                  {selectedAgent.role}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setChatMessages([])}
                title="Limpiar conversación"
                className="p-1 text-[#71717a] hover:text-[#a1a1aa] rounded transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsResponseCardOpen(false)}
                title="Cerrar consola"
                className="p-1 text-[#71717a] hover:text-white rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Área de Mensajes con Scroll */}
          <div className="p-4 max-h-72 overflow-y-auto space-y-3 text-xs leading-relaxed select-text scrollbar-thin">
            {chatMessages.length === 0 ? (
              <div className="text-center py-6 text-[#71717a] space-y-2">
                <Sparkles className="w-6 h-6 text-violet-400 mx-auto opacity-70 animate-pulse" />
                <p className="text-xs text-[#a1a1aa]">Escribe tu instrucción o elige un atajo rápido para {selectedAgent.name}.</p>
                
                {/* Sugerencias Rápidas */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                  {SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(sug)}
                      className="bg-[#18181b] hover:bg-violet-600/20 hover:border-violet-500/40 border border-[#27272a] text-[#d4d4d8] text-[11px] px-2.5 py-1 rounded-full transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-[#71717a] font-mono">
                    <span>{msg.sender}</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className={`relative group max-w-[90%] rounded-xl px-3.5 py-2.5 whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-violet-600 text-white rounded-br-sm shadow-md shadow-violet-950/40' 
                      : 'bg-[#18181b] border border-[#27272a] text-[#f4f4f5] rounded-bl-sm shadow-sm'
                  }`}>
                    {msg.text}

                    {msg.role === 'agent' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title="Copiar respuesta"
                        className="absolute right-2 top-2 p-1 rounded bg-[#27272a]/80 opacity-0 group-hover:opacity-100 hover:text-white transition-opacity text-[#a1a1aa]"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Thinking / Streaming Indicator */}
            {isThinking && (
              <div className="flex items-center gap-2 p-3 bg-[#18181b]/60 border border-violet-500/20 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                <span className="text-[11px] text-violet-300 font-mono animate-pulse">
                  {selectedAgent.name} está redactando y consultando el Brand Brain...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips en pie de consola cuando hay mensajes */}
          {chatMessages.length > 0 && !isThinking && (
            <div className="px-4 py-2 bg-[#09090b] border-t border-[#27272a] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[10px] text-[#71717a] shrink-0 font-mono">Atajos:</span>
              {SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sug)}
                  className="shrink-0 bg-[#121217] hover:bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white text-[10px] px-2 py-0.5 rounded-full transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ─── VISOR SUPERIOR FLOTANTE (MINI-DISPLAY PARA MODO VOZ) ─── */}
      {hudMode === 'voice' && !isResponseCardOpen && (
        <div className="mb-2 bg-[#09090b]/95 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-3 shadow-2xl shadow-violet-950/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#27272a] text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">{selectedAgent.name} (Voz en Vivo)</span>
              {isSpeakerMuted && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-mono">
                  Altavoz Silenciado (Lectura)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsResponseCardOpen(true)}
                className="text-[10px] text-violet-400 hover:underline font-mono"
              >
                Abrir Historial
              </button>
              <span className="text-[10px] font-mono text-[#a1a1aa]">{playbackSpeed}x</span>
            </div>
          </div>

          {/* Visor de texto con scroll */}
          <div className="text-xs text-[#fafafa] leading-relaxed max-h-16 overflow-y-auto pr-1 select-text scrollbar-thin">
            {voiceDisplayFeed}
          </div>
        </div>
      )}

      {/* ─── BARRA PRINCIPAL FLOTANTE ─── */}
      <div className={`relative transition-all duration-300 rounded-full border backdrop-blur-2xl shadow-2xl ${
        hudMode === 'voice' 
          ? 'bg-[#121217]/95 border-violet-500/50 shadow-violet-900/40 p-2.5 px-4' 
          : 'bg-[#18181b]/95 border-[#27272a] shadow-black/80 p-2 px-3'
      }`}>
        
        {/* ═══ MODO TEXTO (BUSCADOR ESTILO IPHONE) ═══ */}
        {hudMode === 'text' && (
          <div className="flex items-center gap-2">
            
            {/* Tuxedo Avatar / Activador del Corbatín */}
            <AlihasTuxedoAvatar
              size={36}
              active={isThinking}
              glow={isThinking}
              title="Alihas — Clic para abrir opciones de cuadrilla"
              onClick={() => setIsAgentMenuOpen(!isAgentMenuOpen)}
            />

            {/* Selector de Agentes */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAgentMenuOpen(!isAgentMenuOpen)}
                className="flex items-center gap-1.5 bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] rounded-full px-2.5 py-1 text-xs text-white transition-colors"
              >
                <Bot className={`w-3.5 h-3.5 ${selectedAgent.color}`} />
                <span className="font-medium">{selectedAgent.name}</span>
                <ChevronDown className="w-3 h-3 text-[#a1a1aa]" />
              </button>

              {/* Menú Dropdown de Agentes */}
              {isAgentMenuOpen && (
                <div className="absolute bottom-11 left-0 bg-[#09090b] border border-[#27272a] rounded-xl p-1.5 w-56 shadow-2xl z-50 space-y-1">
                  <div className="text-[10px] text-[#a1a1aa] px-2 py-1 font-mono uppercase tracking-wider">
                    Cuadrilla de Agentes
                  </div>
                  {AGENTS.map((ag) => (
                    <button
                      key={ag.id}
                      onClick={() => {
                        setSelectedAgent(ag);
                        setIsAgentMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                        selectedAgent.id === ag.id ? 'bg-violet-600/20 text-white' : 'hover:bg-[#18181b] text-[#d4d4d8]'
                      }`}
                    >
                      <div>
                        <div className={`font-semibold ${ag.color}`}>{ag.name}</div>
                        <div className="text-[9px] text-[#71717a] font-mono">{ag.role}</div>
                      </div>
                      {selectedAgent.id === ag.id && <Check className="w-3.5 h-3.5 text-violet-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón Adjuntar Archivo */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Adjuntar archivo, libro o producto"
              className="w-8 h-8 rounded-full hover:bg-[#27272a] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input ref={fileInputRef} type="file" className="hidden" />

            {/* Input Central de Búsqueda / Instrucción */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Instruye a ${selectedAgent.name} o busca en la agencia...`}
              disabled={isThinking}
              className="flex-1 bg-transparent border-0 text-xs text-white placeholder-[#71717a] focus:outline-none px-2 disabled:opacity-50"
            />

            {/* Botón Consola/Historial Toggle */}
            <button
              type="button"
              onClick={() => setIsResponseCardOpen(!isResponseCardOpen)}
              title={isResponseCardOpen ? 'Ocultar consola' : 'Abrir consola de diálogo'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isResponseCardOpen ? 'bg-violet-600/30 text-violet-300' : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]'
              }`}
            >
              {isResponseCardOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            {/* Botón Micrófono para Dictado */}
            <button
              type="button"
              onClick={() => {
                setIsDictating(!isDictating);
                if (!isDictating) {
                  // Dictado rápido simulado
                  setInputText('Eva, analiza el reporte de la Torre');
                }
              }}
              title={isDictating ? 'Detener dictado' : 'Dictar instrucción'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isDictating 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'hover:bg-[#27272a] text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Botón Enviar */}
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={isThinking || !inputText.trim()}
              title="Enviar comando"
              className="w-8 h-8 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 flex items-center justify-center text-white transition-colors shadow-md shadow-violet-950"
            >
              <Send className="w-3.5 h-3.5" />
            </button>

            {/* Botón Switch a MODO VOZ */}
            <button
              type="button"
              onClick={() => {
                setHudMode('voice');
                setIsResponseCardOpen(false);
              }}
              title="Entrar a Modo Voz Conversacional"
              className="flex items-center gap-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all shadow-md shadow-indigo-950"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Voz</span>
            </button>
          </div>
        )}

        {/* ═══ MODO VOZ (BARRA DE ONDAS EN ESPECTRO VISIBLE) ═══ */}
        {hudMode === 'voice' && (
          <div className="flex items-center justify-between gap-3">
            
            {/* Tuxedo Avatar con Corbatín Brillante en Espectro */}
            <AlihasTuxedoAvatar
              size={42}
              active={true}
              glow={true}
              title="Alihas en Modo Voz Activo"
            />

            {/* Ondas de Sonido Dinámicas (Espectro de Luz Visible) */}
            <div className="flex-1 flex items-center justify-center gap-1.5 h-8 px-4 cursor-pointer" onClick={() => setIsResponseCardOpen(!isResponseCardOpen)}>
              <span className="w-1 rounded-full bg-[#ef4444] animate-[bounce_0.8s_infinite_100ms] h-4" />
              <span className="w-1 rounded-full bg-[#f97316] animate-[bounce_0.8s_infinite_200ms] h-7" />
              <span className="w-1 rounded-full bg-[#eab308] animate-[bounce_0.8s_infinite_300ms] h-5" />
              <span className="w-1 rounded-full bg-[#10b981] animate-[bounce_0.8s_infinite_400ms] h-8" />
              <span className="w-1 rounded-full bg-[#06b6d4] animate-[bounce_0.8s_infinite_250ms] h-6" />
              <span className="w-1 rounded-full bg-[#3b82f6] animate-[bounce_0.8s_infinite_150ms] h-7" />
              <span className="w-1 rounded-full bg-[#8b5cf6] animate-[bounce_0.8s_infinite_350ms] h-5" />
              <span className="w-1 rounded-full bg-[#ec4899] animate-[bounce_0.8s_infinite_200ms] h-4" />
            </div>

            {/* Controles de Voz */}
            <div className="flex items-center gap-2">
              
              {/* Botón Mute / Unmute Altavoz */}
              <button
                type="button"
                onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                title={isSpeakerMuted ? 'Activar altavoz' : 'Silenciar altavoz (Solo lectura en visor)'}
                className={`p-2 rounded-full border transition-all ${
                  isSpeakerMuted 
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                    : 'bg-[#09090b] border-[#27272a] text-white hover:border-[#3f3f46]'
                }`}
              >
                {isSpeakerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Botón Mute / Unmute Micrófono */}
              <button
                type="button"
                onClick={() => setIsMicMuted(!isMicMuted)}
                title={isMicMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
                className={`p-2 rounded-full border transition-all ${
                  isMicMuted 
                    ? 'bg-red-500/20 border-red-500/40 text-red-300' 
                    : 'bg-[#09090b] border-[#27272a] text-white hover:border-[#3f3f46]'
                }`}
              >
                {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Selector de Velocidad */}
              <button
                type="button"
                onClick={cycleSpeed}
                title="Cambiar velocidad de reproducción"
                className="px-2.5 py-1.5 rounded-full bg-[#09090b] border border-[#27272a] text-[11px] font-mono text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                {playbackSpeed}x
              </button>

              {/* Botón Salir de Modo Voz */}
              <button
                type="button"
                onClick={() => setHudMode('text')}
                title="Volver a Modo Texto"
                className="p-2 rounded-full bg-[#09090b] hover:bg-[#27272a] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
