import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogInfo = () => {
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = useSelector(({ blogs }) => {
    if (!blogs) {
      return null
    }
    return blogs.find(b => b.id === id)
  })

  if (!blog) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  return (
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div>
        likes: {blog.likes}{' '}
        <button id="like-button" onClick={() => dispatch(likeBlog(blog))}>
          like
        </button>
      </div>
      {blog.user && <div>added by {blog.user.name}</div>}
      {blog.user && blog.user.username === currentUser.username && (
        <button id="remove-button" onClick={handleDelete}>
          remove
        </button>
      )}
    </div>
  )
}

export default BlogInfo