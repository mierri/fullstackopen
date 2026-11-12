import { useContext } from 'react'
import { useGetAnecdotes, useVoteAnecdote } from './hooks/useAnecdotesQuery'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'

const App = () => {
  const [, dispatch] = useContext(NotificationContext)

  const updateAnecdoteMutation = useVoteAnecdote({
    onSuccess: (updatedAnecdote) => {
      dispatch({ type: 'SET', payload: `anecdote '${updatedAnecdote.content}' voted` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useGetAnecdotes()

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
