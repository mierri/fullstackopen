import { create } from 'zustand'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    setAnecdotes: (anecdotes) => set({ anecdotes }),
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        ),
      })),
    updateAnecdote: (updatedAnecdote) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        ),
      })),
    createAnecdote: (newAnecdote) =>
      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
      })),
    setFilter: (filter) => set({ filter }),
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
