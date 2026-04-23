import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const generateId = () => Math.random().toString(36).substr(2, 9)

export const usePromptStore = create(
  persist(
    (set) => ({
      prompts: [],
      activePromptId: null,

      createPrompt: (data) =>
        set((state) => {
          const newPrompt = {
            id: generateId(),
            title: data.title || 'Untitled Prompt',
            content: data.content || '',
            category: data.category || 'general',
            favorite: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          return {
            prompts: [newPrompt, ...state.prompts],
            activePromptId: newPrompt.id,
          }
        }),

      updatePrompt: (id, updates) =>
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      deletePrompt: (id) =>
        set((state) => ({
          prompts: state.prompts.filter((p) => p.id !== id),
          activePromptId: state.activePromptId === id ? null : state.activePromptId,
        })),

      setActive: (id) => set({ activePromptId: id }),

      toggleFavorite: (id) =>
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id ? { ...p, favorite: !p.favorite } : p
          ),
        })),
    }),
    { name: 'promptforge-storage' }
  )
)
