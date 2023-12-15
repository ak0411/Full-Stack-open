import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE, ME } from '../queries'
import { useEffect, useState } from 'react'

const Recommend = () => {
  const user = useQuery(ME)
  const [getFavoriteBooks, result] = useLazyQuery(ALL_BOOKS_BY_GENRE)
  const [booksToShow, setBooksToShow] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooksToShow(result.data.allBooks)
    }
  }, [setBooksToShow, result])

  useEffect(() => {
    if (user.data) {
      getFavoriteBooks({ variables: { genre: user.data.me.favoriteGenre } })
    }
  }, [getFavoriteBooks, user])

  if (user.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.data.me.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend