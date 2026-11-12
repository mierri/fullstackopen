import { useAnecdotes, useFilter, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { updateAnecdote, deleteAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleVote = async (anecdote) => {
    const response = await fetch(`http://localhost:3001/anecdotes/${anecdote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...anecdote,
        votes: anecdote.votes + 1,
      }),
    })
    const updated = await response.json()
    updateAnecdote(updated)
    setNotification(`you voted '${anecdote.content}'`)
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/anecdotes/${id}`, {
      method: 'DELETE',
    })
    deleteAnecdote(id)
  }

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote.id)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
