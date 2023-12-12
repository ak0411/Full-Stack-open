import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersView = () => {
  const users = useSelector(state => state.users)

  if (!users) return null

  return (
    <div className='container'>
      <h2>Users</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView