import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre }
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks

  const allGenres = books.flatMap(book => book.genres)
  const distinctGenres = [...new Set(allGenres)]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {distinctGenres.map(g => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
