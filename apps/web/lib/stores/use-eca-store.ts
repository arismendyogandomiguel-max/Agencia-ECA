import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  brandKitId?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
}

export interface AgentStatus {
  eva: 'online' | 'busy' | 'offline';
  atlas: 'idle' | 'searching' | 'ready';
  vera: 'idle' | 'writing' | 'review';
  kite: 'idle' | 'rendering' | 'error';
  orin: 'idle' | 'publishing' | 'scheduled';
}

export interface ActiveSlide {
  idx: number;
  kicker: string;
  title: string;
  body: string;
  templateId: string;
}

export type UIWidgetMode = 'minimized_icon' | 'floating_hud' | 'docked_drawer' | 'popped_out';
export type UIRoutingMode = 'auto_adaptive' | 'manual';

export interface UserEngineSettings {
  isAgenticUIEnabled: boolean;
  routingMode: UIRoutingMode; // Manual vs Automático Adaptativo
  provider: 'hermes_pilot' | 'openai' | 'anthropic' | 'openrouter';
  voiceOutputEnabled: boolean;
  speechDictationEnabled: boolean;
  customApiKey?: string;
  hermesEndpoint: string;
}

export interface EvaMessage {
  id: string;
  sender: 'user' | 'eva' | 'atlas' | 'vera' | 'kite' | 'orin';
  text: string;
  mediaType?: 'text' | 'image' | 'video' | 'artifact';
  mediaUrl?: string;
  timestamp: string;
}

// ═══ NUEVOS MÓDULOS DE NEGOCIO, UGC & KNOWLEDGE MATRIX ═══

export interface CreatorSubscription {
  id: string;
  name: string;
  platform: 'paypilot' | 'sideshift' | 'joinbrands' | 'billo' | 'trend_io' | 'cohley' | 'shopify' | 'aliexpress' | 'other';
  category: 'payment_escrow' | 'ugc_marketplace' | 'dropshipping' | 'affiliate_network';
  description: string;
  costMonthly: number;
  status: 'active' | 'pending_payment' | 'trial';
  balanceOwed?: number;
  renewalDate: string;
}

export interface UGCCampaign {
  id: string;
  brandName: string;
  platformSource: 'paypilot' | 'joinbrands' | 'billo' | 'sideshift' | 'direct_client';
  productTitle: string;
  payoutAmount: number;
  deadlineDate: string;
  deliverablesSummary: string; // ej: "1x 30s Reel + 3 Hooks de 3s"
  hooks: string[];
  status: 'briefing_received' | 'script_approved' | 'video_recorded' | 'in_brand_review' | 'approved_paid';
  avatarMode: 'ai_avatar_kling' | 'ai_avatar_heygen' | 'human_creator_teleprompter';
}

export interface KnowledgeDistillate {
  id: string;
  topicTitle: string;
  notebookLLMUrl?: string;
  sourceDocuments: string[]; // URLs o nombres de PDFs / Libros / Videos
  graphNodesCount: number;
  extractedTheses: string[];
  lastDistilledAt: string;
}

export interface StyleProfile {
  id: string;
  name: string; // ej: "Joel Osteen (Cálido & Narrativo)", "Alex Hormozi (Alto Valor Directo)", "Tim Roth (Editorial & Factual)"
  pacingWPM: number;
  hookAggressionScore: number; // 1-100
  storytellingFormat: 'hook_story_offer' | 'inspirational_parable' | 'data_driven_breakdown';
  empathyScore: number;
}

export interface ChannelAssignment {
  id: string;
  channelName: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'shopify_store' | 'linkedin';
  assignedKnowledgeId: string;
  assignedStyleId: string;
  assignedSquad: ('eva' | 'atlas' | 'vera' | 'kite' | 'orin')[];
}

interface ECAState {
  // Workspace tenant state
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  setActiveWorkspace: (id: string) => void;

  // Agentic UI Kit State (Alihas Bowtie Metamorphic Switch)
  uiWidgetMode: UIWidgetMode;
  routingMode: UIRoutingMode;
  setUIWidgetMode: (mode: UIWidgetMode) => void;
  setRoutingMode: (mode: UIRoutingMode) => void;
  cycleUIWidgetMode: () => void;

  // Dispatch response from Eva with smart adaptive routing
  dispatchAgentResponse: (msg: EvaMessage) => void;

  // Engine Settings (BYOK & Hermes Pilot)
  engineSettings: UserEngineSettings;
  updateEngineSettings: (patch: Partial<UserEngineSettings>) => void;

  // Agent squad status
  agents: AgentStatus;
  setAgentStatus: (agent: keyof AgentStatus, status: any) => void;

  // Studio live editing state
  activeDraftId: string | null;
  currentSlideIdx: number;
  slides: ActiveSlide[];
  selectedTemplateId: string;
  setActiveDraft: (id: string | null) => void;
  setCurrentSlide: (idx: number) => void;
  updateSlideContent: (idx: number, patch: Partial<ActiveSlide>) => void;
  setSelectedTemplate: (templateId: string) => void;

  // UGC & Creator Monetization Subscriptions
  subscriptions: CreatorSubscription[];
  addSubscription: (sub: CreatorSubscription) => void;
  ugcCampaigns: UGCCampaign[];
  addUGCCampaign: (camp: UGCCampaign) => void;
  updateUGCCampaignStatus: (id: string, status: UGCCampaign['status']) => void;

  // Knowledge Matrix & Style Provisioning
  knowledgeDistillates: KnowledgeDistillate[];
  addKnowledgeDistillate: (k: KnowledgeDistillate) => void;
  styleProfiles: StyleProfile[];
  addStyleProfile: (sp: StyleProfile) => void;
  channelAssignments: ChannelAssignment[];
  assignChannelProfile: (assign: ChannelAssignment) => void;

  // Human-in-the-loop approvals
  pendingApprovalsCount: number;
  incrementApprovals: () => void;
  decrementApprovals: () => void;
}

export const useECAStore = create<ECAState>()(
  persist(
    (set, get) => ({
      workspaces: [
        { id: 'ws-alihaned-master', name: 'Estudio Creativo Agéntico', slug: 'eca-studio', role: 'owner' }
      ],
      activeWorkspaceId: 'ws-alihaned-master',
      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),

      // Agentic UI Kit
      uiWidgetMode: 'minimized_icon',
      routingMode: 'auto_adaptive',
      setUIWidgetMode: (mode) => set({ uiWidgetMode: mode }),
      setRoutingMode: (mode) => set({ routingMode: mode }),
      cycleUIWidgetMode: () =>
        set((state) => {
          const modes: UIWidgetMode[] = ['minimized_icon', 'floating_hud', 'docked_drawer', 'popped_out'];
          const currentIndex = modes.indexOf(state.uiWidgetMode);
          const nextIndex = (currentIndex + 1) % modes.length;
          return { uiWidgetMode: modes[nextIndex] };
        }),

      // Smart Adaptive Dispatcher
      dispatchAgentResponse: (msg: EvaMessage) => {
        const { routingMode } = get();
        if (routingMode === 'auto_adaptive') {
          if (msg.mediaType === 'artifact') {
            set({ uiWidgetMode: 'popped_out' });
          } else if (msg.mediaType === 'image' || msg.mediaType === 'video') {
            set({ uiWidgetMode: 'docked_drawer' });
          } else {
            set({ uiWidgetMode: 'floating_hud' });
          }
        }
      },

      // User Engine Configuration (BYOK / Hermes)
      engineSettings: {
        isAgenticUIEnabled: true,
        routingMode: 'auto_adaptive',
        provider: 'hermes_pilot',
        voiceOutputEnabled: true,
        speechDictationEnabled: true,
        hermesEndpoint: 'https://laboratorio.alihaned.com/hermes'
      },
      updateEngineSettings: (patch) =>
        set((state) => ({
          engineSettings: { ...state.engineSettings, ...patch }
        })),

      // Agent Squad
      agents: {
        eva: 'online',
        atlas: 'idle',
        vera: 'idle',
        kite: 'idle',
        orin: 'idle'
      },
      setAgentStatus: (agent, status) =>
        set((state) => ({
          agents: { ...state.agents, [agent]: status }
        })),

      // Studio Slides
      activeDraftId: null,
      currentSlideIdx: 0,
      slides: [
        { idx: 0, kicker: 'GANCHO VIRAL · 3s', title: 'El Secreto de la Retención', body: 'El 80% de los espectadores deciden quedarse en los primeros 3 segundos.', templateId: 'atlas-serif' },
        { idx: 1, kicker: 'EL PROBLEMA', title: 'Contenido sin Estructura', body: 'Crear contenido sin un mapa de ganchos es quemar presupuesto y tiempo.', templateId: 'atlas-serif' },
        { idx: 2, kicker: 'LA SOLUCIÓN', title: 'ECA + Eva Soberana', body: 'La cuadrilla agéntica orquestada para automatizar guiones, renders y distribución.', templateId: 'bold-modern' }
      ],
      selectedTemplateId: 'atlas-serif',
      setActiveDraft: (id) => set({ activeDraftId: id }),
      setCurrentSlide: (idx) => set({ currentSlideIdx: idx }),
      updateSlideContent: (idx, patch) =>
        set((state) => ({
          slides: state.slides.map((s, i) => (i === idx ? { ...s, ...patch } : s))
        })),
      setSelectedTemplate: (templateId) => set({ selectedTemplateId: templateId }),

      // Subscriptions & UGC Campaigns
      subscriptions: [
        {
          id: 'sub-paypilot',
          name: 'PayPilot Creator Escrow',
          platform: 'paypilot',
          category: 'payment_escrow',
          description: 'Gestión de pagos protegidos por hito y cobro de campañas UGC con marcas internacionales.',
          costMonthly: 29.00,
          status: 'active',
          balanceOwed: 1450.00,
          renewalDate: '2026-11-28'
        },
        {
          id: 'sub-sideshift',
          name: 'SideShift UGC Hub',
          platform: 'sideshift',
          category: 'ugc_marketplace',
          description: 'Portal de licitaciones y aplicaciones a briefs de marcas de alto ticket.',
          costMonthly: 49.00,
          status: 'active',
          renewalDate: '2026-12-05'
        },
        {
          id: 'sub-joinbrands',
          name: 'JoinBrands Creator Pro',
          platform: 'joinbrands',
          category: 'ugc_marketplace',
          description: 'Campañas de productos físicos para unboxing, reseñas y fotos de producto.',
          costMonthly: 19.99,
          status: 'active',
          renewalDate: '2026-11-15'
        }
      ],
      addSubscription: (sub) =>
        set((state) => ({ subscriptions: [sub, ...state.subscriptions] })),

      ugcCampaigns: [
        {
          id: 'camp-001',
          brandName: 'Lumina Skincare',
          platformSource: 'paypilot',
          productTitle: 'Serum Hidratante Vitamina C',
          payoutAmount: 350.00,
          deadlineDate: '2026-11-12',
          deliverablesSummary: '1x Reel 30s + 3 Ganchos alternativos (Unboxing, Problema Acné, Comparativa)',
          hooks: [
            '¿Gastas $100 en cremas que no funcionan? Mira esto.',
            'El error que cometes todas las mañanas con tu piel.',
            'Probé el serum viral por 7 días y esto pasó.'
          ],
          status: 'script_approved',
          avatarMode: 'ai_avatar_heygen'
        },
        {
          id: 'camp-002',
          brandName: 'Nordic Mug Pro',
          platformSource: 'sideshift',
          productTitle: 'Taza Térmica Inteligente con Control de Temp',
          payoutAmount: 500.00,
          deadlineDate: '2026-11-18',
          deliverablesSummary: '1x TikTok 9:16 + 2 fotos de producto para e-commerce',
          hooks: [
            'Tu café se enfría en 10 minutos. El mío dura 4 horas a 60°C.',
            'El gadget de escritorio que todo programador necesita en 2026.'
          ],
          status: 'in_brand_review',
          avatarMode: 'human_creator_teleprompter'
        }
      ],
      addUGCCampaign: (camp) =>
        set((state) => ({ ugcCampaigns: [camp, ...state.ugcCampaigns] })),
      updateUGCCampaignStatus: (id, status) =>
        set((state) => ({
          ugcCampaigns: state.ugcCampaigns.map((c) => (c.id === id ? { ...c, status } : c))
        })),

      // Knowledge Matrix & Style Provisioning
      knowledgeDistillates: [
        {
          id: 'kd-finanzas',
          topicTitle: 'Inversiones Macro, ETFs & Cashflow 2026',
          notebookLLMUrl: 'https://notebooklm.google.com/notebook/finanzas-master-2026',
          sourceDocuments: ['El Inversor Inteligente (PDF)', 'Informes BlackRock Q3', 'Transcripciones Ray Dalio'],
          graphNodesCount: 142,
          extractedTheses: [
            'La inflación estructural exige activos con poder de fijación de precios.',
            'Diversificación asimétrica entre deuda corta y ETFs indexados.',
            'Cashflow recurrente supera a la especulación de capital en ciclos volátiles.'
          ],
          lastDistilledAt: '2026-11-06T18:00:00Z'
        },
        {
          id: 'kd-valores-kids',
          topicTitle: 'Parábolas, Ética & Cuentos para Niños',
          notebookLLMUrl: 'https://notebooklm.google.com/notebook/kids-valores-biblicos',
          sourceDocuments: ['Historias de Sabiduría para Familias', 'Parábolas Ilustradas', 'Canal Cuentos Sabios YT'],
          graphNodesCount: 88,
          extractedTheses: [
            'La perseverancia del sembrador como lección de paciencia diaria.',
            'Empatía y generosidad mediante narraciones de animales y amigos.',
            'Valentía moral frente a la presión social explicada a nivel infantil.'
          ],
          lastDistilledAt: '2026-11-05T14:30:00Z'
        }
      ],
      addKnowledgeDistillate: (k) =>
        set((state) => ({ knowledgeDistillates: [k, ...state.knowledgeDistillates] })),

      styleProfiles: [
        {
          id: 'sp-hormozi',
          name: 'Alex Hormozi (Alto Valor, Retención Agresiva)',
          pacingWPM: 165,
          hookAggressionScore: 92,
          storytellingFormat: 'hook_story_offer',
          empathyScore: 60
        },
        {
          id: 'sp-osteen',
          name: 'Joel Osteen (Cálido, Parábolas & Esperanza)',
          pacingWPM: 130,
          hookAggressionScore: 45,
          storytellingFormat: 'inspirational_parable',
          empathyScore: 95
        },
        {
          id: 'sp-timroth',
          name: 'Tim Roth (Factual, Editorial, Elegante)',
          pacingWPM: 140,
          hookAggressionScore: 70,
          storytellingFormat: 'data_driven_breakdown',
          empathyScore: 75
        }
      ],
      addStyleProfile: (sp) =>
        set((state) => ({ styleProfiles: [sp, ...state.styleProfiles] })),

      channelAssignments: [
        {
          id: 'ca-finanzas-pro',
          channelName: '@FinanzasPro_Latam',
          platform: 'youtube',
          assignedKnowledgeId: 'kd-finanzas',
          assignedStyleId: 'sp-hormozi',
          assignedSquad: ['eva', 'atlas', 'vera', 'kite']
        },
        {
          id: 'ca-cuentos-familia',
          channelName: '@SemillitasDeFe',
          platform: 'tiktok',
          assignedKnowledgeId: 'kd-valores-kids',
          assignedStyleId: 'sp-osteen',
          assignedSquad: ['eva', 'kite', 'orin']
        }
      ],
      assignChannelProfile: (assign) =>
        set((state) => ({ channelAssignments: [assign, ...state.channelAssignments] })),

      pendingApprovalsCount: 3,
      incrementApprovals: () => set((state) => ({ pendingApprovalsCount: state.pendingApprovalsCount + 1 })),
      decrementApprovals: () =>
        set((state) => ({ pendingApprovalsCount: Math.max(0, state.pendingApprovalsCount - 1) }))
    }),
    {
      name: 'eca-alihaned-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
