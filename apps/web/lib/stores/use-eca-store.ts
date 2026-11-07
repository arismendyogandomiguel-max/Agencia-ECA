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

export interface UserEngineSettings {
  isAgenticUIEnabled: boolean;
  provider: 'hermes_pilot' | 'openai' | 'anthropic' | 'openrouter';
  voiceOutputEnabled: boolean;
  speechDictationEnabled: boolean;
  customApiKey?: string;
  hermesEndpoint: string;
}

interface ECAState {
  // Workspace tenant state
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  setActiveWorkspace: (id: string) => void;

  // Agentic UI Kit State (Alihaned Kit)
  uiWidgetMode: UIWidgetMode;
  setUIWidgetMode: (mode: UIWidgetMode) => void;
  cycleUIWidgetMode: () => void;

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

  // Human-in-the-loop approvals
  pendingApprovalsCount: number;
  incrementApprovals: () => void;
  decrementApprovals: () => void;
}

export const useECAStore = create<ECAState>()(
  persist(
    (set) => ({
      workspaces: [
        { id: 'ws-alihaned-master', name: 'ALIHANED Corp', slug: 'alihaned', role: 'owner' }
      ],
      activeWorkspaceId: 'ws-alihaned-master',
      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),

      // Agentic UI Kit
      uiWidgetMode: 'minimized_icon',
      setUIWidgetMode: (mode) => set({ uiWidgetMode: mode }),
      cycleUIWidgetMode: () =>
        set((state) => {
          const modes: UIWidgetMode[] = ['minimized_icon', 'floating_hud', 'docked_drawer', 'popped_out'];
          const currentIndex = modes.indexOf(state.uiWidgetMode);
          const nextIndex = (currentIndex + 1) % modes.length;
          return { uiWidgetMode: modes[nextIndex] };
        }),

      // User Engine Configuration (BYOK / Hermes)
      engineSettings: {
        isAgenticUIEnabled: true,
        provider: 'hermes_pilot',
        voiceOutputEnabled: true,
        speechDictationEnabled: true,
        hermesEndpoint: 'https://laboratorio.alihaned.com/hermes'
      },
      updateEngineSettings: (patch) =>
        set((state) => ({
          engineSettings: { ...state.engineSettings, ...patch }
        })),

      agents: {
        eva: 'online',
        atlas: 'ready',
        vera: 'writing',
        kite: 'idle',
        orin: 'scheduled'
      },
      setAgentStatus: (agent, status) =>
        set((state) => ({
          agents: { ...state.agents, [agent]: status }
        })),

      activeDraftId: 'draft-48',
      currentSlideIdx: 0,
      slides: [
        {
          idx: 0,
          kicker: 'A FIELD GUIDE',
          title: 'No subes al nivel de tus metas. Caes al nivel de tus sistemas.',
          body: 'Por qué la disciplina sola falla y la arquitectura de automatización triunfa cada vez.',
          templateId: 'reel-atlas'
        }
      ],
      selectedTemplateId: 'reel-atlas',
      setActiveDraft: (id) => set({ activeDraftId: id }),
      setCurrentSlide: (idx) => set({ currentSlideIdx: idx }),
      updateSlideContent: (idx, patch) =>
        set((state) => ({
          slides: state.slides.map((s) => (s.idx === idx ? { ...s, ...patch } : s))
        })),
      setSelectedTemplate: (templateId) => set({ selectedTemplateId: templateId }),

      pendingApprovalsCount: 2,
      incrementApprovals: () => set((state) => ({ pendingApprovalsCount: state.pendingApprovalsCount + 1 })),
      decrementApprovals: () => set((state) => ({ pendingApprovalsCount: Math.max(0, state.pendingApprovalsCount - 1) }))
    }),
    {
      name: 'eca-client-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activeWorkspaceId: state.activeWorkspaceId,
        selectedTemplateId: state.selectedTemplateId,
        engineSettings: state.engineSettings,
        uiWidgetMode: state.uiWidgetMode
      })
    }
  )
);
