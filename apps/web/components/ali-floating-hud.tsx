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
  Bot
} from 'lucide-react';
import { AlihasTuxedoAvatar } from './ali-bowtie-avatar';

interface AgentOption {
  id: string;
  name: string;
  role: string;
  color: string;
}

const AGENTS: AgentOption[] = [
  { id: 'eva', name: 'Eva', role: 'Directora & Orquestadora', color: 'text-violet-400' },
  { id: 'atlas', name: 'Atlas', role: 'Estratega de Campañas', color: 'text-blue-400' },
  { id: 'vera', name: 'Vera', role: 'Creadora UGC & Avatares', color: 'text-pink-400' },
  { id: 'kite', name: 'Kite', role: 'Automatizador & Shopify', color: 'text-amber-400' },
  { id: 'orin', name: 'Orin', role: 'Analista de Métricas', color: 'text-emerald-400' },
];

export const AliFloatingHUD: React.FC = () => {
  const [hudMode, setHudMode] = useState<'text' | 'voice'>('text');
  const [selectedAgent, setSelectedAgent] = useState<AgentOption>(AGENTS[0]);
  const [isAgentMenuOpen, setIsAgentMenuOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  
  // Voice controls
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isDictating, setIsDictating] = useState(false);

  // Live response demo for voice mode
  const [voiceDisplayFeed, setVoiceDisplayFeed] = useState<string>(
    'Eva conectada. Analizando métricas de TikTok Shop y sincronizando guiones de Vera con el catálogo de Shopify.'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle voice playback speeds
  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    setVoiceDisplayFeed(`[${selectedAgent.name}] Procesando: "${inputText}"...`);
    setInputText('');
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-auto">
      
      {/* ─── VISOR SUPERIOR FLOTANTE (MINI-DISPLAY PARA MODO VOZ) ─── */}
      {hudMode === 'voice' && (
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
            <span className="text-[10px] font-mono text-[#a1a1aa]">{playbackSpeed}x</span>
          </div>

          {/* Visor de texto: Máximo 3 líneas con scroll si excede */}
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
              active={false}
              title="Alihas — Clic para abrir opciones"
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
                <div className="absolute bottom-11 left-0 bg-[#09090b] border border-[#27272a] rounded-xl p-1.5 w-52 shadow-2xl z-50 space-y-1">
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
                      <span className={`font-semibold ${ag.color}`}>{ag.name}</span>
                      <span className="text-[10px] text-[#71717a]">{ag.role}</span>
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
              className="flex-1 bg-transparent border-0 text-xs text-white placeholder-[#71717a] focus:outline-none px-2"
            />

            {/* Botón Micrófono para Dictado */}
            <button
              type="button"
              onClick={() => setIsDictating(!isDictating)}
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
              onClick={handleSend}
              title="Enviar comando"
              className="w-8 h-8 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center text-white transition-colors shadow-md shadow-violet-950"
            >
              <Send className="w-3.5 h-3.5" />
            </button>

            {/* Botón Switch a MODO VOZ */}
            <button
              type="button"
              onClick={() => setHudMode('voice')}
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
            <div className="flex-1 flex items-center justify-center gap-1.5 h-8 px-4">
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
