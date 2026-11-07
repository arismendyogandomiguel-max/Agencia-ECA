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
  ShieldCheck, 
  Wrench, 
  DollarSign, 
  Cpu, 
  FolderGit2, 
  CheckCircle2, 
  Clock, 
  Coins, 
  ArrowUpRight,
  TrendingUp,
  Send,
  ShoppingBag,
  Youtube,
  BookOpen,
  Mic,
  Sliders,
  ExternalLink,
  Layers,
  Share2,
  Plus,
  Menu,
  User,
  Settings,
  CreditCard,
  LogOut,
  ChevronRight,
  HardDrive,
  Check,
  Smartphone,
  CheckCheck,
  AlertTriangle,
  Play
} from 'lucide-react';

export type FloorTab = 
  | 'command_center'       // Piso 1
  | 'ideas_trends'          // Piso 2
  | 'reels_shorts'          // Piso 3
  | 'long_video'            // Piso 4
  | 'brand_vault'           // Piso 5
  | 'social_calendar'       // Piso 6
  | 'human_gate'            // Piso 7
  | 'gadgets_plugins'       // Piso 8
  | 'monetization_creators' // Piso 9
  | 'sovereign_engine';     // Piso 10

export default function ECAAppPage() {
  const [activeTab, setActiveTab] = useState<FloorTab>('command_center');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Form states
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
    channelAssignments
  } = useECAStore();

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  // 10 Pisos Arquitecturales
  const navItems = [
    {
      id: 'command_center' as FloorTab,
      floorNumber: 'P1',
      label: 'Command Center',
      icon: LayoutDashboard,
      iconColor: 'text-violet-400',
      badge: 'En vivo'
    },
    {
      id: 'ideas_trends' as FloorTab,
      floorNumber: 'P2',
      label: 'Ideas & Tendencias Hub',
      icon: Sparkles,
      iconColor: 'text-cyan-400',
      badge: 'Radar 98%'
    },
    {
      id: 'reels_shorts' as FloorTab,
      floorNumber: 'P3',
      label: 'Reels & Shorts Studio',
      icon: Smartphone,
      iconColor: 'text-pink-400',
      badge: '9:16'
    },
    {
      id: 'long_video' as FloorTab,
      floorNumber: 'P4',
      label: 'Long Video & Clips',
      icon: Film,
      iconColor: 'text-red-400',
      badge: '16:9'
    },
    {
      id: 'brand_vault' as FloorTab,
      floorNumber: 'P5',
      label: 'Brand Kit & Asset Vault',
      icon: Layers,
      iconColor: 'text-amber-400',
      badge: '230 Nodos'
    },
    {
      id: 'social_calendar' as FloorTab,
      floorNumber: 'P6',
      label: 'Social Calendar Sync',
      icon: Calendar,
      iconColor: 'text-emerald-400',
      badge: 'G-Cal'
    },
    {
      id: 'human_gate' as FloorTab,
      floorNumber: 'P7',
      label: 'Aprobaciones HITL',
      icon: ShieldCheck,
      iconColor: 'text-amber-300',
      badge: `${pendingApprovalsCount}`
    },
    {
      id: 'gadgets_plugins' as FloorTab,
      floorNumber: 'P8',
      label: 'Gadgets del Esmoquin',
      icon: Wrench,
      iconColor: 'text-indigo-400',
      badge: 'Drive $0'
    },
    {
      id: 'monetization_creators' as FloorTab,
      floorNumber: 'P9',
      label: 'Monetización & PayPilot',
      icon: DollarSign,
      iconColor: 'text-emerald-400',
      badge: '$1,950'
    },
    {
      id: 'sovereign_engine' as FloorTab,
      floorNumber: 'P10',
      label: 'Soberanía & Hermes',
      icon: Cpu,
      iconColor: 'text-violet-400',
      badge: 'Dokploy'
    }
  ];

  const handleSimulateFunnel = () => {
    if (!aliExpressUrl) return;
    setIsGeneratingFunnel(true);
    setTimeout(() => {
      setIsGeneratingFunnel(false);
      setFunnelGenerated(true);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-[#fafafa] overflow-hidden font-sans">
      
      {/* ─── SIDEBAR (10 PISOS) ─── */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-16 min-w-[64px]' : 'w-64 min-w-[260px]'
        } bg-[#121217] border-r border-[#27272a] flex flex-col transition-all duration-200 ease-in-out shrink-0 relative z-30 select-none`}
      >
        {/* Brand Header & Toggle */}
        <div className={`border-b border-[#27272a] flex items-center transition-all ${
          isSidebarCollapsed ? 'p-3 flex-col gap-3' : 'p-4 justify-between gap-2'
        }`}>
          {isSidebarCollapsed ? (
            <>
              {/* Hamburger Button when collapsed */}
              <button
                onClick={() => setIsSidebarCollapsed(false)}
                title="Expandir barra lateral"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors group relative"
              >
                <Menu className="w-5 h-5 text-violet-400" />
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 bg-[#18181b] border border-[#3f3f46] text-[#fafafa] text-xs font-semibold rounded-lg shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50">
                  Expandir menú lateral
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#18181b] border-l border-b border-[#3f3f46] rotate-45" />
                </div>
              </button>

              {/* Alihas Avatar (icon-only mode) */}
              <div className="relative group">
                <AlihasTuxedoAvatar size={34} title="Alihas — Alter Ego Soberano" />
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 bg-[#18181b] border border-[#3f3f46] text-[#fafafa] text-xs font-semibold rounded-lg shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50">
                  Estudio Creativo Agéntico
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#18181b] border-l border-b border-[#3f3f46] rotate-45" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 min-w-0">
                <AlihasTuxedoAvatar size={40} title="Alihas — Alter Ego Soberano" />
                <div className="min-w-0">
                  <h1 className="font-bold text-[13px] text-white tracking-tight leading-tight truncate">
                    Estudio Creativo Agéntico
                  </h1>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-[#a1a1aa] font-mono tracking-wider truncate">Alihas Sovereign Hub</span>
                    <span className="text-[8px] text-[#71717a] font-mono shrink-0">· alihaned</span>
                  </div>
                </div>
              </div>

              {/* Hamburger Button when expanded to collapse */}
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                title="Contraer a sólo iconos"
                className="p-1.5 text-[#71717a] hover:text-white hover:bg-[#27272a] rounded-lg transition-colors shrink-0"
              >
                <Menu className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Workspace Switcher */}
        {isSidebarCollapsed ? (
          <div className="p-2 flex justify-center border-b border-[#27272a]/60">
            <div className="relative group">
              <button 
                title={activeWorkspace?.name || 'Estudio Creativo Agéntico'}
                className="w-10 h-10 rounded-lg bg-violet-950/40 border border-violet-800/40 flex items-center justify-center hover:border-violet-600 transition-colors"
              >
                <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                  {activeWorkspace?.name?.charAt(0) || 'E'}
                </div>
              </button>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 bg-[#18181b] border border-[#3f3f46] text-[#fafafa] text-xs font-semibold rounded-lg shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50">
                Workspace: {activeWorkspace?.name || 'Estudio Creativo Agéntico'}
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#18181b] border-l border-b border-[#3f3f46] rotate-45" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 border-b border-[#27272a]/60">
            <div className="text-[10px] uppercase tracking-wider text-[#71717a] px-2 mb-1.5 font-medium">
              Workspace Activo
            </div>
            <button className="w-full bg-[#18181b] border border-[#27272a] hover:border-violet-500/50 rounded-lg p-2 flex items-center justify-between text-left transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
                  {activeWorkspace?.name?.charAt(0) || 'E'}
                </div>
                <span className="text-xs font-semibold truncate text-[#f4f4f5]">{activeWorkspace?.name || 'Estudio Creativo Agéntico'}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 font-mono">PRO</span>
            </button>
          </div>
        )}

        {/* 10 Navigation Floors */}
        <nav className={`flex-1 ${isSidebarCollapsed ? 'px-2' : 'px-2.5'} py-2 space-y-1 overflow-y-auto`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center rounded-lg text-xs font-medium transition-all duration-150 ${
                    isSidebarCollapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2'
                  } ${
                    isActive
                      ? 'bg-violet-600/25 text-violet-200 border border-violet-500/40 shadow-sm shadow-violet-900/20 font-semibold'
                      : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b] border border-transparent'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-violet-300' : item.iconColor}`} />
                  
                  {!isSidebarCollapsed && (
                    <>
                      <span className="text-[10px] font-mono text-[#71717a] shrink-0">{item.floorNumber}</span>
                      <span className="truncate flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                          isActive 
                            ? 'bg-violet-500/20 text-violet-200 border border-violet-500/30' 
                            : 'bg-[#27272a] text-[#a1a1aa]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {/* Floating Tooltip ONLY when collapsed */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 bg-[#18181b] border border-[#3f3f46] text-[#fafafa] text-xs font-semibold rounded-lg shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-violet-400">{item.floorNumber}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">
                        {item.badge}
                      </span>
                    )}
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#18181b] border-l border-b border-[#3f3f46] rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ─── BOTTOM-LEFT USER PROFILE MENU (POPOVER) ─── */}
        <div className="p-2.5 border-t border-[#27272a] bg-[#0e0e12] relative">
          
          {/* Profile Button */}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center rounded-xl p-2 transition-all hover:bg-[#18181b] border ${
              isProfileOpen ? 'border-violet-500/50 bg-[#18181b]' : 'border-transparent'
            } ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}
            title="Arismendy Ogando (Owner Pro Soberano)"
          >
            {/* Redondito Avatar con indicador de estado esmeralda */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-emerald-400 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-full bg-[#18181b] flex items-center justify-center font-bold text-xs text-violet-200">
                  AO
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#121217]" />
            </div>

            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1 text-left">
                <div className="text-xs font-semibold text-white truncate">Arismendy Ogando</div>
                <div className="text-[10px] text-emerald-400 font-mono truncate">Owner Pro Soberano</div>
              </div>
            )}
          </button>

          {/* Interactive Popover Menu */}
          {isProfileOpen && (
            <div 
              className={`absolute ${
                isSidebarCollapsed ? 'left-full ml-3 bottom-0' : 'bottom-full mb-2 left-2 right-2'
              } w-72 bg-[#18181b] border border-[#3f3f46] rounded-xl shadow-2xl p-3 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-[#27272a]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-emerald-400 p-[1.5px] shrink-0">
                  <div className="w-full h-full rounded-full bg-[#09090b] flex items-center justify-center font-bold text-sm text-violet-200">
                    AO
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">Arismendy Ogando</h4>
                  <p className="text-[10px] text-[#a1a1aa] truncate">arismendy@alihaned.com</p>
                  <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                    Plan Pro Soberano
                  </span>
                </div>
              </div>

              {/* Gadgets Conectados Status */}
              <div className="bg-[#09090b] rounded-lg p-2.5 border border-[#27272a] space-y-1.5">
                <div className="text-[10px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Arsenal de Gadgets Activos</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[#a1a1aa] flex items-center gap-1.5">
                    <HardDrive className="w-3 h-3 text-cyan-400" /> Google Drive (Zero-Cost):
                  </span>
                  <span className="text-emerald-400 font-mono font-medium">Conectado</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[#a1a1aa] flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-emerald-400" /> Google Calendar:
                  </span>
                  <span className="text-emerald-400 font-mono font-medium">Sync OK</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[#a1a1aa] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Semrush / Trends:
                  </span>
                  <span className="text-amber-400 font-mono font-medium">AI Fallback $0</span>
                </div>
              </div>

              {/* Menu Links */}
              <div className="space-y-1 text-xs">
                <button 
                  onClick={() => { setActiveTab('command_center'); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors text-left"
                >
                  <User className="w-3.5 h-3.5 text-violet-400" />
                  <span>Mi Perfil Soberano</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('gadgets_plugins'); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors text-left"
                >
                  <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Configuración de Gadgets & Plugins</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('monetization_creators'); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors text-left"
                >
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Plan & Facturación (PayPilot)</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('sovereign_engine'); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Configuración del Servidor Dokploy</span>
                </button>
              </div>

              {/* Logout Footer */}
              <div className="pt-2 border-t border-[#27272a]">
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors text-left text-xs font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#09090b]">
        
        {/* Top Header */}
        <header className="h-14 border-b border-[#27272a] bg-[#121217]/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(false)}
                title="Expandir barra lateral"
                className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] rounded-lg transition-colors mr-1"
              >
                <Menu className="w-4 h-4 text-violet-400" />
              </button>
            )}
            <span className="text-xs uppercase tracking-wider text-[#a1a1aa] font-semibold">
              ECA // {navItems.find(n => n.id === activeTab)?.floorNumber}: {navItems.find(n => n.id === activeTab)?.label}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px] font-mono">
              @Agent_Eca_Bot
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium font-mono text-[11px]">Eva Soberana Online</span>
            </div>
          </div>
        </header>

        {/* Dynamic Views per Floor */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ════ PISO 1: COMMAND CENTER ════ */}
          {activeTab === 'command_center' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              
              {/* Row 1: Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#121217] border border-[#27272a] rounded-xl p-4 shadow-sm hover:border-violet-500/40 transition-colors">
                  <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                    <span className="text-xs">Campañas UGC Activas</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">$1,950.00</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                    <TrendingUp className="w-3 h-3" /> PayPilot Escrow
                  </div>
                </div>

                <div className="bg-[#121217] border border-[#27272a] rounded-xl p-4 shadow-sm hover:border-cyan-500/40 transition-colors">
                  <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                    <span className="text-xs">Zumo de Conocimiento</span>
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">230 Nodos</div>
                  <div className="text-[11px] text-cyan-400 mt-1 font-mono">
                    NotebookLLM + Perplexity
                  </div>
                </div>

                <div className="bg-[#121217] border border-[#27272a] rounded-xl p-4 shadow-sm hover:border-amber-500/40 transition-colors">
                  <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                    <span className="text-xs">Embudo Dropshipping</span>
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">1-Clic Activo</div>
                  <div className="text-[11px] text-amber-400 mt-1 font-mono">
                    AliExpress / Amazon Scraper
                  </div>
                </div>

                <div className="bg-[#121217] border border-[#27272a] rounded-xl p-4 shadow-sm hover:border-violet-500/40 transition-colors">
                  <div className="flex justify-between items-center text-[#a1a1aa] mb-2">
                    <span className="text-xs">Inferencia Soberana</span>
                    <Coins className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">JEV Router</div>
                  <div className="text-[11px] text-violet-400 mt-1 font-mono">
                    gpt-6.1-sol / gpt-6-luna
                  </div>
                </div>
              </div>

              {/* Row 2: Cuadrilla de Agentes Especialistas */}
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Cuadrilla de Agentes Especialistas (Nave 1 ECA)</h3>
                    <p className="text-xs text-[#a1a1aa]">Desplegados en Dokploy privado bajo la red <span className="font-mono text-emerald-400">ecanet</span></p>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono">
                    5/5 En línea
                  </span>
                </div>
                
                <div className="grid grid-cols-5 gap-3">
                  <div className="bg-[#18181b] border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-violet-300">Eva (Alihas)</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Directora Creativa</p>
                    <p className="text-[10px] text-violet-400 font-mono mt-2">gpt-6.1-sol</p>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-cyan-300">Atlas</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Scout de Tendencias</p>
                    <p className="text-[10px] text-cyan-400 font-mono mt-2">gpt-6.1-sol</p>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-pink-300">Vera</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Guionista & Hooks</p>
                    <p className="text-[10px] text-pink-400 font-mono mt-2">gpt-6-luna</p>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-300">Kite</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Director Visual 9:16</p>
                    <p className="text-[10px] text-amber-400 font-mono mt-2">gpt-6-luna</p>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-emerald-300">Orin</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Distribución & Postiz</p>
                    <p className="text-[10px] text-emerald-400 font-mono mt-2">gpt-6-luna</p>
                  </div>
                </div>
              </div>

              {/* Row 3: Arsenal de Gadgets del Esmoquin (James Bond) */}
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Arsenal de Gadgets del Esmoquin (Conectores Sin Reinventar la Rueda)</h3>
                    <p className="text-xs text-[#a1a1aa]">Aprovecha cuentas externas para costo $0 en infraestructura y almacenamiento soberano</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('gadgets_plugins')}
                    className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1"
                  >
                    Ver Arsenal Completo <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5" /> Google Drive
                      </span>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                        Cero Costo
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Almacena renders finales sin saturar el disco del servidor VPS.</p>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Google Calendar
                      </span>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                        Sync Activo
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Cronograma visual sincronizado con eventos y alertas de publicación.</p>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Semrush & Trends
                      </span>
                      <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono">
                        AI Fallback $0
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Si el usuario no tiene plan de pago, la IA sintetiza las keywords vía API.</p>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5" /> Postiz Multi-Red
                      </span>
                      <span className="text-[9px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded font-mono">
                        Auto-Publish
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Despacho programado a TikTok, Instagram Reels, YouTube Shorts y X.</p>
                  </div>
                </div>
              </div>

              {/* Row 4: Cola de Aprobaciones Human-in-the-Loop */}
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-semibold text-white">Cola de Aprobaciones Human-in-the-Loop (Gatekeeper)</h3>
                  </div>
                  <span className="text-xs text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                    {pendingApprovalsCount} Pendientes de Validación
                  </span>
                </div>
                
                <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Reel #082: El Secreto del Zumo de Conocimiento</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 font-mono">TikTok 9:16</span>
                    </div>
                    <p className="text-[11px] text-[#a1a1aa]">Generado por Vera (Guion) y Kite (Render). Listo para programar en Google Calendar.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setActiveTab('human_gate')}
                      className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      Revisar en Piso 7 <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ════ PISO 2: IDEAS & TENDENCIAS HUB ════ */}
          {activeTab === 'ideas_trends' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" /> Radar Viral y Generador de Ganchos (Atlas + Vera)
                    </h3>
                    <p className="text-xs text-[#a1a1aa]">Monitorea nichos calientes y genera hooks de 3 segundos probados para retención del 85%+</p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                    Conector Semrush AI Fallback Activo
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <span className="text-xs font-bold text-cyan-300">Tendencia: Agentes Autónomos 2026</span>
                    <p className="text-[11px] text-[#a1a1aa]">Score Viral: 98/100 · Nicho: Tech & Productividad</p>
                    <div className="bg-[#09090b] p-2 rounded text-[11px] text-white border border-[#27272a]">
                      Gancho #1: "El 90% de la gente usa la IA como chat, pero este truco de 3 clics..."
                    </div>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <span className="text-xs font-bold text-cyan-300">Tendencia: Finanzas Soberanas</span>
                    <p className="text-[11px] text-[#a1a1aa]">Score Viral: 92/100 · Nicho: Finanzas Personales</p>
                    <div className="bg-[#09090b] p-2 rounded text-[11px] text-white border border-[#27272a]">
                      Gancho #2: "Por qué los millonarios nunca guardan su dinero en este tipo de cuenta..."
                    </div>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <span className="text-xs font-bold text-cyan-300">Tendencia: Dropshipping de Alta Conversión</span>
                    <p className="text-[11px] text-[#a1a1aa]">Score Viral: 89/100 · Nicho: E-commerce</p>
                    <div className="bg-[#09090b] p-2 rounded text-[11px] text-white border border-[#27272a]">
                      Gancho #3: "Si estás probando productos a mano en 2026 estás perdiendo 10 horas al día..."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ PISO 3: REELS & SHORTS STUDIO (9:16) ════ */}
          {activeTab === 'reels_shorts' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-pink-400" /> Reels & Shorts Studio (Vera & Kite 9:16)
                  </h3>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20 font-mono">
                    Formato Vertical Nativo
                  </span>
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  Desglose de escenas con fórmula de retención matemática: Gancho (0-3s), Retención (4-25s), Clímax (26-45s) y CTA (46-60s).
                </p>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-[#18181b] border border-pink-500/30 rounded-lg p-4 space-y-2">
                    <div className="text-xs font-bold text-pink-300">Escena 1 (0-3s)</div>
                    <p className="text-[11px] text-white">Visual Disruptivo + Gancho Sonoro</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Retención esperada: 94%</span>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <div className="text-xs font-bold text-pink-300">Escena 2 (4-25s)</div>
                    <p className="text-[11px] text-white">Prueba Social & Demostración Rápida</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Pacing: 160 WPM</span>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <div className="text-xs font-bold text-pink-300">Escena 3 (26-45s)</div>
                    <p className="text-[11px] text-white">Revelación de la Solución Clave</p>
                    <span className="text-[10px] text-violet-400 font-mono">Kling / MiniMax B-Roll</span>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <div className="text-xs font-bold text-emerald-300">Escena 4 (46-60s)</div>
                    <p className="text-[11px] text-white">Llamada a la Acción (CTA)</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Comenta "ECA" para enlace</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ PISO 4: LONG VIDEO & REPURPOSING ════ */}
          {activeTab === 'long_video' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Film className="w-4 h-4 text-red-400" /> Long Video (YouTube 16:9) ➔ Extracción Automática de Clips
                  </h3>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-red-500/10 text-red-300 border border-red-500/20 font-mono">
                    Bloques Modulares 3-5 min
                  </span>
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  Convierte un video largo de YouTube o podcast en 4-6 clips verticales de alto impacto con subtítulos sincronizados listos para redes.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <span className="text-xs font-bold text-red-300">Clip #1: El Mito de los Modelos Pesados</span>
                    <p className="text-[11px] text-[#a1a1aa]">Duración: 52s · Extraído del min 04:12</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Viral Score: 91%</span>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <span className="text-xs font-bold text-red-300">Clip #2: Cómo Ahorrar $2,000 en Almacenamiento</span>
                    <p className="text-[11px] text-[#a1a1aa]">Duración: 48s · Extraído del min 11:30</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Viral Score: 95%</span>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 space-y-2">
                    <span className="text-xs font-bold text-red-300">Clip #3: La Estructura de 10 Pisos Explicada</span>
                    <p className="text-[11px] text-[#a1a1aa]">Duración: 59s · Extraído del min 18:05</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Viral Score: 88%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ PISO 5: BRAND KIT & ASSET VAULT (ZUMO + DROPSHIP) ════ */}
          {activeTab === 'brand_vault' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              
              {/* Dropshipping 1-Clic Funnel */}
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
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
                    className="flex-1 bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
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
                      <div className="bg-[#18181b] p-3 rounded-lg border border-[#27272a]">
                        <span className="text-[10px] text-[#a1a1aa] block mb-1">Landing Page</span>
                        <p className="font-semibold text-white">Funnel de Alta Conversión</p>
                        <p className="text-[11px] text-emerald-400 mt-1">Listo para Netlify / Shopify</p>
                      </div>
                      <div className="bg-[#18181b] p-3 rounded-lg border border-[#27272a]">
                        <span className="text-[10px] text-[#a1a1aa] block mb-1">Facebook Ads</span>
                        <p className="font-semibold text-white">4 Variaciones de Copy</p>
                        <p className="text-[11px] text-violet-400 mt-1">Ángulos: Dolor, Ahorro, Viral</p>
                      </div>
                      <div className="bg-[#18181b] p-3 rounded-lg border border-[#27272a]">
                        <span className="text-[10px] text-[#a1a1aa] block mb-1">Guiones UGC 9:16</span>
                        <p className="font-semibold text-white">3 Hooks de 3 Segundos</p>
                        <p className="text-[11px] text-pink-400 mt-1">Generado por Vera</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Zumo de Conocimiento y Perfiles de Estilo */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#121217] border border-[#27272a] rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" /> Zumo de Conocimiento
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                      Grafo Vivo
                    </span>
                  </div>
                  <div className="space-y-3">
                    {knowledgeDistillates.map(kd => (
                      <div key={kd.id} className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-cyan-300">{kd.topicTitle}</span>
                          <span className="text-[10px] font-mono text-[#a1a1aa]">{kd.graphNodesCount} Nodos</span>
                        </div>
                        <p className="text-[11px] text-[#a1a1aa]">Fuentes: {kd.sourceDocuments.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#121217] border border-[#27272a] rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-violet-400" /> Provisión de Estilos Narrativos
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-mono">
                      Cadencias Guardadas
                    </span>
                  </div>
                  <div className="space-y-3">
                    {styleProfiles.map(sp => (
                      <div key={sp.id} className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-violet-300">{sp.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400">{sp.pacingWPM} WPM</span>
                        </div>
                        <div className="text-[10px] text-amber-400 font-mono">Formato: {sp.storytellingFormat}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ════ PISO 6: SOCIAL CALENDAR SYNC ════ */}
          {activeTab === 'social_calendar' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" /> Social Calendar (Sincronización Directa Google Calendar)
                  </h3>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                    Conector Google Activo
                  </span>
                </div>
                <p className="text-xs text-[#a1a1aa]">
                  No necesitas programadores complejos propios. Los posts aprobados crean eventos en tu Google Calendar y disparan los webhooks de publicación automáticamente.
                </p>
                <div className="grid grid-cols-7 gap-2 pt-2 text-center text-xs">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d, i) => (
                    <div key={i} className="bg-[#18181b] border border-[#27272a] rounded-lg p-3 space-y-2">
                      <span className="font-bold text-white block">{d}</span>
                      <div className="bg-violet-950/40 border border-violet-800/40 rounded p-1.5 text-[10px] text-violet-300">
                        {i % 2 === 0 ? '1 Reel 9:16 (18:00)' : 'Short + X Post'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ PISO 7: HUMAN GATEKEEPER ════ */}
          {activeTab === 'human_gate' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" /> Aprobaciones Human-in-the-Loop (Gatekeeper Soberano)
                  </h3>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                    Ningún post sale sin tu visto bueno
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Campaña Dropshipping: Mini Proyector 4K</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 font-mono">Reel 9:16</span>
                      </div>
                      <p className="text-[11px] text-[#a1a1aa]">Guion validado por Vera · Render generado por Kite · Destino: TikTok Ads</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 text-xs px-3 py-1.5 rounded-lg transition-colors">
                        Rechazar / Ajustar
                      </button>
                      <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Aprobar & Programar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ PISO 8: GADGETS DEL ESMOQUIN (JAMES BOND ARSENAL) ════ */}
          {activeTab === 'gadgets_plugins' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-indigo-400" /> Gadgets del Esmoquin (James Bond Arsenal)
                    </h3>
                    <p className="text-xs text-[#a1a1aa]">
                      Herramientas conectables que potencian las capacidades de ECA sin sobrecargar el servidor local.
                    </p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                    Conexiones API / OAuth
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-800/30">
                          <HardDrive className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Google Drive Almacenamiento</h4>
                          <p className="text-[11px] text-[#a1a1aa]">Guarda videos de alta calidad a $0 costo en VPS</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        Conectado
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa]">
                      Los renders pesados se suben directamente a la carpeta del cliente en Google Drive sin consumir disco en Dokploy.
                    </p>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-800/30">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Google Calendar</h4>
                          <p className="text-[11px] text-[#a1a1aa]">Visualizador y disparador cronológico</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        Conectado
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa]">
                      Sincronización bidireccional de posts aprobados para no tener que reinventar una agenda desde cero.
                    </p>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-amber-950/40 text-amber-400 border border-amber-800/30">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Semrush & Google Trends</h4>
                          <p className="text-[11px] text-[#a1a1aa]">Monitoreo de palabras clave y volumen</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                        AI Fallback
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa]">
                      Soporte híbrido: Si el usuario tiene cuenta de Semrush se conecta vía API; si no, la IA sintetiza el análisis gratis.
                    </p>
                  </div>

                  <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-violet-950/40 text-violet-400 border border-violet-800/30">
                          <Share2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Postiz Auto-Publish</h4>
                          <p className="text-[11px] text-[#a1a1aa]">Despacho multiplataforma</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 font-mono">
                        Enlazado
                      </span>
                    </div>
                    <p className="text-xs text-[#a1a1aa]">
                      Publica automáticamente en TikTok, Instagram, YouTube Shorts, X y LinkedIn tras la aprobación HITL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════ PISO 9: MONETIZACIÓN & CREADORES (PAYPILOT) ════ */}
          {activeTab === 'monetization_creators' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-white">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Suscripciones y Marketplaces UGC Activos (PayPilot)
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {subscriptions.map(sub => (
                    <div key={sub.id} className="bg-[#18181b] border border-[#27272a] rounded-lg p-4">
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
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-white">Campañas UGC en Curso (Pipeline de Creador)</h3>
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> + Ingestar Briefing UGC
                  </button>
                </div>
                <div className="space-y-3">
                  {ugcCampaigns.map(camp => (
                    <div key={camp.id} className="bg-[#18181b] border border-[#27272a] rounded-lg p-4 flex items-center justify-between">
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

          {/* ════ PISO 10: SOBERANÍA & MOTOR AGÉNTICO ════ */}
          {activeTab === 'sovereign_engine' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="bg-[#121217] border border-[#27272a] rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-violet-400" /> Soberanía & Dokploy Telemetry
                  </h3>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-mono">
                    VPS 100.66.184.126
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs font-mono">
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-1">
                    <span className="text-[#a1a1aa] block text-[10px]">Contenedor Hermes:</span>
                    <span className="text-emerald-400 font-bold">mayordomia-hermes-eca</span>
                    <span className="text-[10px] text-[#71717a] block">Status: Running (Healthy)</span>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-1">
                    <span className="text-[#a1a1aa] block text-[10px]">Red Aislada:</span>
                    <span className="text-cyan-400 font-bold">ecanet (bridge)</span>
                    <span className="text-[10px] text-[#71717a] block">Zero-leaks externa</span>
                  </div>
                  <div className="bg-[#18181b] border border-[#27272a] rounded-lg p-3.5 space-y-1">
                    <span className="text-[#a1a1aa] block text-[10px]">Bot Telegram:</span>
                    <span className="text-violet-400 font-bold">@Agent_Eca_Bot</span>
                    <span className="text-[10px] text-[#71717a] block">Polling webhook activo</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Floating Bowtie HUD */}
        <AliFloatingHUD />
      </main>
    </div>
  );
}
