import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'

export const useGetAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })
}

export const useCreateAnecdote = (options = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      if (options.onSuccess) options.onSuccess(newAnecdote)
    },
    onError: options.onError,
  })
}

export const useVoteAnecdote = (options = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      if (options.onSuccess) options.onSuccess(updatedAnecdote)
    },
  })
}
