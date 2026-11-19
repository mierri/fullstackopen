import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const userResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = userResult.data?.me?.favoriteGenre
  const books = booksResult.data ? booksResult.data.allBooks : []

  const recommendedBooks = favoriteGenre
    ? books.filter((b) => b.genres && b.genres.includes(favoriteGenre))
    : []

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.id || a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
