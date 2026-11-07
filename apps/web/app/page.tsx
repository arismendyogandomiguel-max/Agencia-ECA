'use client';

import React from 'react';
import { useECAStore } from '@/lib/stores/use-eca-store';
import { 
  LayoutDashboard, 
  Sparkles, 
  Film, 
  Video, 
  Calendar, 
  Radio, 
  FolderGit2, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ArrowUpRight,
  TrendingUp,
  Send
} from 'lucide-react';

export default function CommandCenterPage() {
  const { 
    workspaces, 
    activeWorkspaceId, 
    agents, 
    pendingApprovalsCount 
  } = useECAStore();

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-[#fafafa] overflow-hidden">
      
      {/* ─── SIDEBAR ─── */}
      <aside className="w-64 min-w-[260px] bg-[#18181b] border-r border-[#27272a] flex flex-col">
        {/* Brand Logo */}
        <div className="p-5 border-b border-[#27272a] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center font-extrabold text-white text-base shadow-lg shadow-violet-900/20">
            E
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">ECA Studio</h1>
            <p className="text-[11px] text-[#a1a1aa]">Estudio Creativo Agéntico</p>
          </div>
        </div>

        {/* Workspace Switcher */}
        <div className="p-3">
          <div className="text-[10px] uppercase tracking-wider text-[#a1a1aa] px-2 mb-2 font-medium">
            Workspace
          </div>
          <button className="w-full bg-violet-950/40 border border-violet-800/40 rounded-lg p-2.5 flex items-center justify-between text-left hover:border-violet-600 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                {activeWorkspace?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-xs font-semibold">{activeWorkspace?.name || 'ALIHANED Corp'}</span>
            </div>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-violet-600/15 text-violet-300 font-semibold text-xs border border-violet-500/20">
            <LayoutDashboard className="w-4 h-4 text-violet-400" />
            Command Center
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50 text-xs transition-colors">
            <Sparkles className="w-4 h-4" />
            Brand Brain
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50 text-xs transition-colors">
            <div className="flex items-center gap-3">
              <Film className="w-4 h-4" />
              Reels Studio (9:16)
            </div>
            <span className="bg-violet-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">NEW</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50 text-xs transition-colors">
            <Video className="w-4 h-4" />
            Video Studio (16:9)
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50 text-xs transition-colors">
            <Calendar className="w-4 h-4" />
            Calendario & Postiz
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50 text-xs transition-colors">
            <Radio className="w-4 h-4" />
            Conectores & MCP
          </a>
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-[#27272a]">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#09090b]/50 border border-[#27272a]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-xs font-bold">
              J
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">Jesús Arismendi</p>
              <p className="text-[10px] text-[#a1a1aa]">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b border-[#27272a] flex items-center justify-between px-6 bg-[#09090b]">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold tracking-tight">Command Center</h2>
            <span className="text-[11px] bg-[#18181b] border border-[#27272a] text-[#a1a1aa] px-2.5 py-0.5 rounded-full">
              {activeWorkspace?.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs px-3 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">Eva Online (Hermes)</span>
            </div>
            <button className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors shadow-sm">
              + Nueva Misión
            </button>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Row 1: Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
              <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                <span className="text-xs">Piezas Creadas</span>
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
              </div>
              <div className="text-2xl font-bold">247</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +12% esta semana
              </div>
            </div>

            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
              <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                <span className="text-xs">Publicadas (Postiz)</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold">183</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Omnicanal activo
              </div>
            </div>

            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
              <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                <span className="text-xs">En Pipeline</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold">14</div>
              <div className="text-[11px] text-amber-400 mt-1">
                {pendingApprovalsCount} esperando tu aprobación
              </div>
            </div>

            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
              <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                <span className="text-xs">Créditos de Inferencia</span>
                <Coins className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold">$42.18</div>
              <div className="text-[11px] text-[#a1a1aa] mt-1">
                ALiRouter / LiteLLM activo
              </div>
            </div>
          </div>

          {/* Row 2: Squad Status */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold">Cuadrilla de Agentes Especialistas</h3>
              <span className="text-xs text-emerald-400 font-medium">5/5 Operativos</span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-violet-400">Eva</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-[#a1a1aa]">Directora Creativa</p>
                <p className="text-[10px] text-emerald-400 mt-2 font-mono">Misión Alpha</p>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-400">Atlas</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[11px] text-[#a1a1aa]">Scout de Ideas</p>
                <p className="text-[10px] text-blue-400 mt-2 font-mono">12 Tendencias</p>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400">Vera</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <p className="text-[11px] text-[#a1a1aa]">Copywriter & Hooks</p>
                <p className="text-[10px] text-amber-400 mt-2 font-mono">Guion #48</p>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-pink-400">Kite</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[11px] text-[#a1a1aa]">Director Visual (9:16)</p>
                <p className="text-[10px] text-pink-400 mt-2 font-mono">Atlas Serif</p>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400">Orin</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[11px] text-[#a1a1aa]">Publisher (Postiz)</p>
                <p className="text-[10px] text-emerald-400 mt-2 font-mono">3 programados</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ─── EVA CHAT DRAWER (Right 340px) ─── */}
      <aside className="w-[340px] min-w-[340px] bg-[#18181b] border-l border-[#27272a] flex flex-col">
        <div className="h-14 border-b border-[#27272a] flex items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center text-xs font-bold">
              E
            </div>
            <div>
              <p className="text-xs font-semibold">Eva — Directora Creativa</p>
              <p className="text-[10px] text-emerald-400">● Misión Alpha activa</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-3 text-xs leading-relaxed">
            ¡Hola! 🎬 He completado la investigación con Atlas. Vera tiene listo el guion para el Reel 9:16 con el hook de <span className="text-violet-400 font-semibold">Sistemas vs Metas</span>. ¿Aprobamos el render para Kite?
          </div>

          <div className="bg-[#09090b] border border-violet-500/50 rounded-xl p-3.5 space-y-2 border-l-4 border-l-violet-500">
            <p className="text-[10px] uppercase font-bold text-violet-400">Esperando Aprobación</p>
            <p className="text-xs font-medium">Reel 9:16 — "Sistemas vs Metas"</p>
            <p className="text-[11px] text-[#a1a1aa]">Template: Atlas Serif · 4 Escenas</p>
            <div className="flex gap-2 pt-1">
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 rounded-lg transition-colors">
                🟢 Aprobar Render
              </button>
              <button className="px-2.5 py-1.5 bg-[#18181b] border border-[#27272a] text-xs rounded-lg hover:border-violet-500 transition-colors">
                🔄
              </button>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-[#27272a]">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Habla con Eva..." 
              className="flex-1 bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-[#fafafa] placeholder-[#a1a1aa] focus:outline-none focus:border-violet-500"
            />
            <button className="w-8 h-8 rounded-lg bg-violet-600 hover:bg-violet-500 flex items-center justify-center text-white transition-colors">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
}
