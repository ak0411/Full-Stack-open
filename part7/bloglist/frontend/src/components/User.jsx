import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(({ users }) => {
    if (!users) {
      return null
    }
    return users.find(u => u.id === id)
  })

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <div>added blogs</div>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User