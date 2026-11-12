import { useContext } from 'react'
import { useCreateAnecdote } from '../hooks/useAnecdotesQuery'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useCreateAnecdote({
    onSuccess: (newAnecdote) => {
      dispatch({ type: 'SET', payload: `anecdote '${newAnecdote.content}' created` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
      dispatch({ type: 'SET', payload: error.message || 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
