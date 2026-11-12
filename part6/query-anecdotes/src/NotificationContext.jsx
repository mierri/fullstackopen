import { createContext, useReducer, useContext } from 'react'

let timeoutId = null

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotify = () => {
  const [, dispatch] = useContext(NotificationContext)
  return (message, seconds = 5) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch({ type: 'SET', payload: message })
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, seconds * 1000)
  }
}

export default NotificationContext
