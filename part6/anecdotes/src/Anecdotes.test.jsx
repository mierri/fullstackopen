import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAnecdoteStore } from './store'
import AnecdoteList from './components/AnecdoteList'

describe('Anecdotes unit tests', () => {
  it('state is initialized with the anecdotes returned by the backend', () => {
    const anecdotes = [
      { id: '1', content: 'First test anecdote', votes: 3 },
      { id: '2', content: 'Second test anecdote', votes: 7 },
    ]
    useAnecdoteStore.getState().actions.setAnecdotes(anecdotes)
    expect(useAnecdoteStore.getState().anecdotes).toEqual(anecdotes)
  })

  it('component displaying anecdotes receives the anecdotes from the store sorted by votes', () => {
    const anecdotes = [
      { id: '1', content: 'Low vote anecdote', votes: 1 },
      { id: '2', content: 'High vote anecdote', votes: 9 },
      { id: '3', content: 'Medium vote anecdote', votes: 5 },
    ]
    useAnecdoteStore.getState().actions.setAnecdotes(anecdotes)
    useAnecdoteStore.getState().actions.setFilter('')

    render(<AnecdoteList />)

    const voteCounts = screen.getAllByText(/has \d+/)
    expect(voteCounts[0]).toHaveTextContent('has 9')
    expect(voteCounts[1]).toHaveTextContent('has 5')
    expect(voteCounts[2]).toHaveTextContent('has 1')
  })

  it('correct React component receives a properly filtered list of anecdotes', () => {
    const anecdotes = [
      { id: '1', content: 'Learning Redux or Zustand', votes: 2 },
      { id: '2', content: 'Writing backend in Node', votes: 4 },
    ]
    useAnecdoteStore.getState().actions.setAnecdotes(anecdotes)
    useAnecdoteStore.getState().actions.setFilter('Zustand')

    render(<AnecdoteList />)

    expect(screen.getByText('Learning Redux or Zustand')).toBeInTheDocument()
    expect(screen.queryByText('Writing backend in Node')).toBeNull()
  })
})
