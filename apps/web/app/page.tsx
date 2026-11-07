'use client';

import React, { useState } from 'react';
import { useECAStore, UGCCampaign, CreatorSubscription } from '@/lib/stores/use-eca-store';
import { AliFloatingHUD } from '@/components/ali-floating-hud';
import { AlihasTuxedoAvatar } from '@/components/ali-bowtie-avatar';
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
  Send,
  DollarSign,
  ShoppingBag,
  Youtube,
  BookOpen,
  Mic,
  Sliders,
  ExternalLink,
  Layers,
  Share2,
  Plus
} from 'lucide-react';

type MainTab = 'command_center' | 'ugc_monetization' | 'knowledge_style' | 'dropship_funnel' | 'youtube_modular';

export default function CommandCenterPage() {
  const [activeTab, setActiveTab] = useState<MainTab>('command_center');
  const [aliExpressUrl, setAliExpressUrl] = useState('');
  const [isGeneratingFunnel, setIsGeneratingFunnel] = useState(false);
  const [funnelGenerated, setFunnelGenerated] = useState(false);

  const { 
    workspaces, 
    activeWorkspaceId, 
    agents, 
    pendingApprovalsCount,
    subscriptions,
    ugcCampaigns,
    updateUGCCampaignStatus,
    knowledgeDistillates,
    styleProfiles,
    channelAssignments,
    uiWidgetMode,
    cycleUIWidgetMode
  } = useECAStore();

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  const handleSimulateFunnel = () => {
    if (!aliExpressUrl) return;
    setIsGeneratingFunnel(true);
    setTimeout(() => {
      setIsGeneratingFunnel(false);
      setFunnelGenerated(true);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-[#fafafa] overflow-hidden">
      
      {/* ─── SIDEBAR ─── */}
      <aside className="w-64 min-w-[260px] bg-[#18181b] border-r border-[#27272a] flex flex-col">
        {/* Brand Logo */}
        <div className="p-5 border-b border-[#27272a] flex items-center gap-3.5">
          <AlihasTuxedoAvatar size={44} title="Alihas — Alter Ego Soberano" />
          <div className="min-w-0">
            <h1 className="font-bold text-[13px] text-white tracking-tight leading-tight">
              Estudio Creativo Agéntico
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] text-[#71717a] font-mono tracking-wider">Alihas Sovereign Hub</span>
              <span className="text-[8px] text-[#52525b] font-mono">· alihaned</span>
            </div>
          </div>
        </div>

        {/* Workspace Switcher */}
        <div className="p-3">
          <div className="text-[10px] uppercase tracking-wider text-[#a1a1aa] px-2 mb-2 font-medium">
            Workspace Activo
          </div>
          <button className="w-full bg-violet-950/40 border border-violet-800/40 rounded-lg p-2.5 flex items-center justify-between text-left hover:border-violet-600 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                {activeWorkspace?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-xs font-semibold">{activeWorkspace?.name || 'Estudio Creativo Agéntico'}</span>
            </div>
          </button>
        </div>

        {/* Nav Tabs */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('command_center')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'command_center' 
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' 
                : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-violet-400" />
            Command Center
          </button>

          <button 
            onClick={() => setActiveTab('ugc_monetization')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'ugc_monetization' 
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' 
                : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Campañas UGC & PayPilot
          </button>

          <button 
            onClick={() => setActiveTab('knowledge_style')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'knowledge_style' 
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' 
                : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Zumo de Conocimiento & Estilo
          </button>

          <button 
            onClick={() => setActiveTab('dropship_funnel')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'dropship_funnel' 
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' 
                : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            Dropshipping 1-Clic Funnel
          </button>

          <button 
            onClick={() => setActiveTab('youtube_modular')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'youtube_modular' 
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' 
                : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#27272a]/50'
            }`}
          >
            <Youtube className="w-4 h-4 text-red-400" />
            YouTube Modular (3-5 min)
          </button>
        </nav>

        {/* Footer: Telemetría Dokploy & Red Ecanet */}
        <div className="p-3 border-t border-[#27272a] text-[11px] text-[#a1a1aa] space-y-1 bg-[#121217]">
          <div className="flex justify-between items-center text-[10px]">
            <span>Red Aislada:</span>
            <span className="text-emerald-400 font-mono">ecanet (activa)</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span>Hermes Dokploy:</span>
            <span className="text-violet-400 font-mono">mayordomia-hermes-eca</span>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 border-b border-[#27272a] bg-[#18181b]/50 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#a1a1aa] font-semibold">
              Estudio Creativo Agéntico // {activeTab.replace('_', ' ').toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px] font-mono">
              @Agent_Eca_Bot
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium font-mono">Eva Soberana Online</span>
            </div>
          </div>
        </header>

        {/* Dynamic Views */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ════ VIEW 1: COMMAND CENTER ════ */}
          {activeTab === 'command_center' && (
            <div className="space-y-6">
              {/* Row 1: Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
                  <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                    <span className="text-xs">Campañas UGC Activas</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono">$1,950.00</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> PayPilot + SideShift
                  </div>
                </div>

                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
                  <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                    <span className="text-xs">Zumo de Conocimiento</span>
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono">230 Nodos</div>
                  <div className="text-[11px] text-cyan-400 mt-1">
                    NotebookLLM + Perplexity Sync
                  </div>
                </div>

                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
                  <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                    <span className="text-xs">Modelos de Negocio</span>
                    <Layers className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold">5 Activos</div>
                  <div className="text-[11px] text-amber-400 mt-1">
                    Dropship, YT, UGC, Afiliados, Coaching
                  </div>
                </div>

                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4">
                  <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                    <span className="text-xs">Inferencia ChatGPT / Codex</span>
                    <Coins className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono">JEV Router</div>
                  <div className="text-[11px] text-violet-400 mt-1">
                    gpt-6.1-sol / gpt-6-luna
                  </div>
                </div>
              </div>

              {/* Row 2: Squad Status */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold">Cuadrilla de Agentes Especialistas (Nave 1 ECA)</h3>
                  <span className="text-xs text-emerald-400 font-medium">5/5 Conectados vía Telegram & Dokploy</span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  <div className="bg-[#09090b] border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-violet-400">Eva (Alihas)</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Directora Creativa</p>
                    <p className="text-[10px] text-violet-400 font-mono mt-2">gpt-6.1-sol</p>
                  </div>
                  <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-blue-400">Atlas</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Scout de Tendencias</p>
                    <p className="text-[10px] text-blue-400 font-mono mt-2">gpt-6.1-sol</p>
                  </div>
                  <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-pink-400">Vera</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Guionista & Hooks</p>
                    <p className="text-[10px] text-pink-400 font-mono mt-2">gpt-6-luna</p>
                  </div>
                  <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-400">Kite</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Director Visual & 9:16</p>
                    <p className="text-[10px] text-amber-400 font-mono mt-2">gpt-6-luna</p>
                  </div>
                  <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-400">Orin</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Distribución & Postiz</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-2">gpt-6-luna</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ VIEW 2: UGC & MONETIZATION HUB ════ */}
          {activeTab === 'ugc_monetization' && (
            <div className="space-y-6">
              {/* Subscriptions Bar */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Suscripciones y Marketplaces UGC Activos
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {subscriptions.map(sub => (
                    <div key={sub.id} className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-emerald-400">{sub.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                          ${sub.costMonthly}/mes
                        </span>
                      </div>
                      <p className="text-[11px] text-[#a1a1aa] mb-3">{sub.description}</p>
                      {sub.balanceOwed && (
                        <div className="bg-emerald-950/30 border border-emerald-800/40 rounded p-2 text-xs flex justify-between">
                          <span className="text-[#a1a1aa]">Por Cobrar / Escrow:</span>
                          <span className="font-bold text-emerald-300 font-mono">${sub.balanceOwed.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* UGC Campaigns Tracker */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold">Campañas UGC en Curso (Pipeline de Creador)</h3>
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" /> + Ingestar Briefing UGC
                  </button>
                </div>
                <div className="space-y-3">
                  {ugcCampaigns.map(camp => (
                    <div key={camp.id} className="bg-[#09090b] border border-[#27272a] rounded-lg p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-violet-300">{camp.brandName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase font-mono">
                            {camp.platformSource}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-white">{camp.productTitle}</p>
                        <p className="text-[11px] text-[#a1a1aa]">{camp.deliverablesSummary}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[10px] text-amber-400 font-mono">Deadline: {camp.deadlineDate}</span>
                          <span className="text-[10px] text-cyan-400 font-mono">Modo: {camp.avatarMode}</span>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="text-base font-bold font-mono text-emerald-400">${camp.payoutAmount.toFixed(2)}</div>
                        <span className="inline-block text-[10px] px-2.5 py-1 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 font-semibold">
                          {camp.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ VIEW 3: KNOWLEDGE & STYLE MATRIX ════ */}
          {activeTab === 'knowledge_style' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Zumo de Conocimiento (Knowledge Distillation) */}
                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" /> Zumo de Conocimiento (NotebookLLM / Perplexity)
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                      Grafo Vivo
                    </span>
                  </div>
                  <p className="text-xs text-[#a1a1aa]">
                    No guarda texto plano. Destila libros, PDFs, la Biblia o videos de YouTube en un grafo estructurado de hechos y conceptos.
                  </p>
                  <div className="space-y-3">
                    {knowledgeDistillates.map(kd => (
                      <div key={kd.id} className="bg-[#09090b] border border-[#27272a] rounded-lg p-3.5 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-cyan-300">{kd.topicTitle}</span>
                          <span className="text-[10px] font-mono text-[#a1a1aa]">{kd.graphNodesCount} Nodos</span>
                        </div>
                        <p className="text-[11px] text-[#a1a1aa]">Fuentes: {kd.sourceDocuments.join(', ')}</p>
                        <div className="border-t border-[#27272a] pt-2">
                          <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-semibold block mb-1">Tesis Destiladas:</span>
                          <ul className="text-[11px] text-[#fafafa] list-disc list-inside space-y-0.5">
                            {kd.extractedTheses.map((t, idx) => (
                              <li key={idx}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Provisión de Estilo (Style Matrix) */}
                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-violet-400" /> Provisión de Estilo (Retórica & Cadencia)
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 font-mono">
                      Estilos Guardados
                    </span>
                  </div>
                  <p className="text-xs text-[#a1a1aa]">
                    Extrae el patrón narrativo, pausas y ganchos de referentes (Joel Osteen, Alex Hormozi, Tim Roth) sin mezclar los datos.
                  </p>
                  <div className="space-y-3">
                    {styleProfiles.map(sp => (
                      <div key={sp.id} className="bg-[#09090b] border border-[#27272a] rounded-lg p-3.5 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-violet-300">{sp.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400">{sp.pacingWPM} WPM</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#a1a1aa]">
                          <div>Agresión de Gancho: <span className="font-mono text-violet-300 font-bold">{sp.hookAggressionScore}%</span></div>
                          <div>Empatía: <span className="font-mono text-pink-300 font-bold">{sp.empathyScore}%</span></div>
                        </div>
                        <div className="text-[10px] text-amber-400 font-mono">Formato: {sp.storytellingFormat}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Matriz de Asignación por Canal */}
              <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-emerald-400" /> Asignación de Conocimiento + Estilo por Canal
                </h3>
                <div className="space-y-2">
                  {channelAssignments.map(ca => (
                    <div key={ca.id} className="bg-[#09090b] border border-[#27272a] rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-white">{ca.channelName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 uppercase font-mono">{ca.platform}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-cyan-400">🧠 {ca.assignedKnowledgeId}</span>
                        <span className="text-violet-400">🎙️ {ca.assignedStyleId}</span>
                        <span className="text-emerald-400">👥 {ca.assignedSquad.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ VIEW 4: DROPSHIPPING 1-CLIC FUNNEL ════ */}
          {activeTab === 'dropship_funnel' && (
            <div className="space-y-6">
              <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-400" /> Generador de Embudo Dropshipping 1-Clic
                </h3>
                <p className="text-xs text-[#a1a1aa]">
                  Pega el enlace de un producto en AliExpress o Amazon. Eva extrae fotos, beneficios y objeciones para crear la landing de venta en Shopify/Netlify, 4 variaciones de anuncios para Facebook Ads y guiones de video UGC.
                </p>

                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={aliExpressUrl}
                    onChange={(e) => setAliExpressUrl(e.target.value)}
                    placeholder="https://aliexpress.com/item/100500682910... o enlace de Amazon"
                    className="flex-1 bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                  <button 
                    onClick={handleSimulateFunnel}
                    disabled={isGeneratingFunnel}
                    className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {isGeneratingFunnel ? 'Extrayendo & Diseñando...' : 'Generar Embudo Completo'}
                  </button>
                </div>

                {funnelGenerated && (
                  <div className="mt-4 bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                      <span>✓ Embudo Generado con Éxito</span>
                      <span className="font-mono text-emerald-400">Shopify Draft Listo</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="bg-[#09090b] p-3 rounded-lg border border-[#27272a]">
                        <span className="text-[10px] text-[#a1a1aa] block mb-1">Landing Page</span>
                        <p className="font-semibold text-white">Funnel de Alta Conversión</p>
                        <p className="text-[11px] text-emerald-400 mt-1">Listo para Netlify / Shopify</p>
                      </div>
                      <div className="bg-[#09090b] p-3 rounded-lg border border-[#27272a]">
                        <span className="text-[10px] text-[#a1a1aa] block mb-1">Facebook Ads</span>
                        <p className="font-semibold text-white">4 Variaciones de Copy</p>
                        <p className="text-[11px] text-violet-400 mt-1">Ángulos: Dolor, Ahorro, Viral</p>
                      </div>
                      <div className="bg-[#09090b] p-3 rounded-lg border border-[#27272a]">
                        <span className="text-[10px] text-[#a1a1aa] block mb-1">Guiones UGC 9:16</span>
                        <p className="font-semibold text-white">3 Hooks de 3 Segundos</p>
                        <p className="text-[11px] text-pink-400 mt-1">Generado por Vera</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════ VIEW 5: YOUTUBE MODULAR (3-5 MIN) ════ */}
          {activeTab === 'youtube_modular' && (
            <div className="space-y-6">
              <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-400" /> Pipeline de YouTube Modular (Faceless Channels)
                  </h3>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono">
                    Regla: Bloques de 3-5 min por Escena
                  </span>
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  Para garantizar retención y evitar fatiga, los videos largos se construyen en bloques modulares de 3 a 5 minutos. Cada bloque tiene su propio gancho, resolución y teaser hacia la siguiente escena.
                </p>

                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-4 space-y-2">
                    <div className="text-xs font-bold text-red-400">Escena 1 (0:00 - 3:30)</div>
                    <p className="text-xs font-semibold text-white">El Incidente Inicial</p>
                    <p className="text-[11px] text-[#a1a1aa]">Gancho de 5s + B-Roll Kling/MiniMax + Audio ElevenLabs</p>
                    <div className="text-[10px] text-emerald-400 font-mono">Short #1 Extraído</div>
                  </div>
                  <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-4 space-y-2">
                    <div className="text-xs font-bold text-red-400">Escena 2 (3:30 - 7:00)</div>
                    <p className="text-xs font-semibold text-white">La Evidencia Oculta</p>
                    <p className="text-[11px] text-[#a1a1aa]">Ritmo acelerado con zoom dinámico y subtítulos automáticos</p>
                    <div className="text-[10px] text-emerald-400 font-mono">Short #2 Extraído</div>
                  </div>
                  <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-4 space-y-2">
                    <div className="text-xs font-bold text-red-400">Escena 3 (7:00 - 10:30)</div>
                    <p className="text-xs font-semibold text-white">La Revelación Final</p>
                    <p className="text-[11px] text-[#a1a1aa]">Clímax narrativo y llamada a la acción hacia la suscripción</p>
                    <div className="text-[10px] text-emerald-400 font-mono">Short #3 Extraído</div>
                  </div>
                  <div className="bg-[#09090b] border border-red-500/30 rounded-xl p-4 space-y-2">
                    <div className="text-xs font-bold text-emerald-400">Assets Finales</div>
                    <p className="text-xs font-semibold text-white">Miniatura + Drive Sync</p>
                    <p className="text-[11px] text-[#a1a1aa]">3x Variaciones A/B en Canva + Carpeta en Google Drive</p>
                    <div className="text-[10px] text-cyan-400 font-mono">Listo para Postiz</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ─── FLOATING METAMORPHIC ALIHAS BOWTIE HUD (MODO TEXTO / MODO VOZ) ─── */}
        <AliFloatingHUD />
      </main>
    </div>
  );
}
