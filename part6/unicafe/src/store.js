import { create } from 'zustand'

const useFeedbackStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    incrementGood: () => set((state) => ({ good: state.good + 1 })),
    incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
    reset: () => set({ good: 0, neutral: 0, bad: 0 }),
  },
}))

export const useGood = () => useFeedbackStore((state) => state.good)
export const useNeutral = () => useFeedbackStore((state) => state.neutral)
export const useBad = () => useFeedbackStore((state) => state.bad)
export const useFeedbackActions = () => useFeedbackStore((state) => state.actions)
