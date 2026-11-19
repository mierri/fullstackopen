import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const userResult = useQuery(ME)
  const favoriteGenre = userResult.data?.me?.favoriteGenre

  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
    fetchPolicy: 'cache-and-network',
  })

  if (!props.show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data ? booksResult.data.allBooks : []

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
          {books.map((a) => (
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
