import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const EditAuthor = ({ authors }) => {
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const born = event.target.born.value

    editAuthor({ variables: { name, setBornTo: Number(born) } })

    event.target.name.value = ''
    event.target.born.value = ''
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select name="name">
          {authors.map(author => 
            <option key={author.name} value={author.name}>{author.name}</option>
          )}
        </select>
        <div>
          born
          <input type="number" name="born" />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

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
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor authors={authors} />
    </div>
  )
}

export default Authors
