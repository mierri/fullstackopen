import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries'

const Authors = ({ show, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    return <div>error loading authors: {result.error.message}</div>
  }

  const authors = result.data ? result.data.allAuthors : []

  const submitBirthYear = async (event) => {
    event.preventDefault()

    const authorName = name || (authors[0] ? authors[0].name : '')
    if (!authorName) return

    editAuthor({
      variables: {
        name: authorName,
        setBornTo: parseInt(born),
      },
    })

    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id || a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={submitBirthYear}>
            <div>
              <label>
                name
                <select
                  name="name"
                  value={name || (authors[0] ? authors[0].name : '')}
                  onChange={({ target }) => setName(target.value)}
                >
                  {authors.map((a) => (
                    <option key={a.id || a.name} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                born
                <input
                  type="number"
                  value={born}
                  onChange={({ target }) => setBorn(target.value)}
                />
              </label>
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors
