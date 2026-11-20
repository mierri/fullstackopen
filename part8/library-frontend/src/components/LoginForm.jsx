import { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0]?.message || 'login failed')
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      client.resetStore()
      setUsername('')
      setPassword('')
      setErrorMessage(null)
      setPage('authors')
    }
  }, [result.data, setToken, setPage, client])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    setErrorMessage(null)
    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>login</h2>
      {errorMessage && <div style={{ color: 'red' }}>login failed: {errorMessage}</div>}
      <form onSubmit={submit}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
