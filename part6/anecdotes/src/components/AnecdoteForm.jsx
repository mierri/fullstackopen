import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const response = await fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, votes: 0 }),
    })
    const newAnecdote = await response.json()
    createAnecdote(newAnecdote)
    setNotification(`you created '${content}'`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
