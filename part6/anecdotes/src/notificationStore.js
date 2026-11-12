import { create } from 'zustand'

let timeoutId = null

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification: (message, seconds = 5) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      set({ notification: message })
      timeoutId = setTimeout(() => {
        set({ notification: null })
      }, seconds * 1000)
    },
    clearNotification: () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      set({ notification: null })
    },
  },
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
