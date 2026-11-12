import { create } from 'zustand'

let timeoutId = null

const useNotificationStore = create((set) => ({
  message: null,
  type: 'success',
  showNotification: (message, type = 'success', seconds = 5) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    set({ message, type })
    timeoutId = setTimeout(() => {
      set({ message: null, type: 'success' })
      timeoutId = null
    }, seconds * 1000)
  },
  clearNotification: () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    set({ message: null, type: 'success' })
  },
}))

export default useNotificationStore
