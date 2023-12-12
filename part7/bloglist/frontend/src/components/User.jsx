import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Blog from './Blog'

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
    <div className='container-fluid'>
      <h2 className='display-4'>{user.name}</h2>
      <span className='text-muted'>Created:</span>
      {user.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default User