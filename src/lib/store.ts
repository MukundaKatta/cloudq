import { create } from "zustand";
import type { ChatMessage, Conversation, ToolCategory, CloudProvider } from "@/types";
import { generateId } from "@/lib/utils";

interface AppState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  activeTool: ToolCategory;
  sidebarOpen: boolean;
  selectedProvider: CloudProvider;
  darkMode: boolean;
  isLoading: boolean;

  setActiveTool: (tool: ToolCategory) => void;
  setSidebarOpen: (open: boolean) => void;
  setSelectedProvider: (provider: CloudProvider) => void;
  setDarkMode: (dark: boolean) => void;
  setIsLoading: (loading: boolean) => void;

  createConversation: (category: ToolCategory) => Conversation;
  setActiveConversation: (conv: Conversation | null) => void;
  addMessage: (message: ChatMessage) => void;
  updateLastAssistantMessage: (content: string) => void;
  deleteConversation: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  conversations: [],
  activeConversation: null,
  activeTool: "chat",
  sidebarOpen: true,
  selectedProvider: "aws",
  darkMode: true,
  isLoading: false,

  setActiveTool: (tool) => set({ activeTool: tool }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  setDarkMode: (dark) => set({ darkMode: dark }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  createConversation: (category) => {
    const conv: Conversation = {
      id: generateId(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      category,
    };
    set((state) => ({
      conversations: [conv, ...state.conversations],
      activeConversation: conv,
    }));
    return conv;
  },

  setActiveConversation: (conv) => set({ activeConversation: conv }),

  addMessage: (message) => {
    const state = get();
    let conv = state.activeConversation;
    if (!conv) {
      conv = get().createConversation(state.activeTool);
    }
    const updated: Conversation = {
      ...conv,
      messages: [...conv.messages, message],
      updatedAt: new Date(),
      title:
        conv.messages.length === 0 && message.role === "user"
          ? message.content.slice(0, 50)
          : conv.title,
    };
    set((s) => ({
      activeConversation: updated,
      conversations: s.conversations.map((c) =>
        c.id === updated.id ? updated : c
      ),
    }));
  },

  updateLastAssistantMessage: (content) => {
    const state = get();
    const conv = state.activeConversation;
    if (!conv) return;
    const msgs = [...conv.messages];
    const lastIdx = msgs.length - 1;
    if (lastIdx >= 0 && msgs[lastIdx].role === "assistant") {
      msgs[lastIdx] = { ...msgs[lastIdx], content };
    }
    const updated = { ...conv, messages: msgs, updatedAt: new Date() };
    set((s) => ({
      activeConversation: updated,
      conversations: s.conversations.map((c) =>
        c.id === updated.id ? updated : c
      ),
    }));
  },

  deleteConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      activeConversation:
        state.activeConversation?.id === id ? null : state.activeConversation,
    }));
  },
}));
