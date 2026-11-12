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
})
