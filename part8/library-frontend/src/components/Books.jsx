import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const allBooksResult = useQuery(ALL_BOOKS, {
    fetchPolicy: 'cache-and-network',
  })
  const genreBooksResult = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
    fetchPolicy: 'cache-and-network',
  })

  if (!props.show) {
    return null
  }

  if (
    allBooksResult.loading ||
    (selectedGenre && genreBooksResult.loading && !genreBooksResult.data)
  ) {
    return <div>loading...</div>
  }

  if (allBooksResult.error) {
    return <div>error loading books: {allBooksResult.error.message}</div>
  }

  const allBooks = allBooksResult.data ? allBooksResult.data.allBooks : []
  const genres = [...new Set(allBooks.flatMap((b) => b.genres || []))]

  const displayedBooks = selectedGenre
    ? genreBooksResult.data
      ? genreBooksResult.data.allBooks
      : []
    : allBooks

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && (
        <p>
          in genre <b>{selectedGenre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {displayedBooks.map((a) => (
            <tr key={a.id || a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
