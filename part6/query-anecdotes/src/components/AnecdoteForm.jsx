import { useCreateAnecdote } from '../hooks/useAnecdotesQuery'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const notify = useNotify()

  const newAnecdoteMutation = useCreateAnecdote({
    onSuccess: (newAnecdote) => {
      notify(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {
      notify(error.message || 'too short anecdote, must have length 5 or more')
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
