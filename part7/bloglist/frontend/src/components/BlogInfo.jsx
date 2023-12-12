import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'

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

  const handleComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    const comment = { comment: content }
    dispatch(addComment(blog, comment))
  }

  return (
    <div className='container'>
      <h1 className='display-4'>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url} target='_blank' rel='noreferrer'>
        {blog.url}
      </a>
      <div className='mt-1'>
        <span className='text-muted'>Likes: {blog.likes}</span>
      </div>
      {blog.user && (
        <div className='mt-1'>
          <span className='text-muted'>Added by {blog.user.name}</span>
        </div>
      )}
      <div className='row g-3 mt-1'>
        <div className='col-auto'>
          <button
            id='like-button'
            onClick={() => dispatch(likeBlog(blog))}
            className='btn btn-success'
          >
            Like
          </button>
        </div>
        <div className='col-auto'>
          {blog.user && blog.user.username === currentUser.username && (
            <button
              id='remove-button'
              onClick={handleDelete}
              className='btn btn-danger'
            >
              Remove
            </button>
          )}
        </div>
      </div >
      <h2 className='display-5 mt-1'>Comments</h2>
      <form className='row g-3 mb-3' onSubmit={handleComment}>
        <div className='col-auto'>
          <input className='form-control' type='text' name='comment' autoComplete='off' />
        </div>
        <div className='col-auto'>
          <button className='btn btn-primary' type='submit'>Add comment</button>
        </div>
      </form>
      {blog.comments.length > 0 &&
        <ul className='list-group list-group-flush'>
          {blog.comments.map(c =>
            <li className='list-group-item' key={c.id}>{c.comment}</li>
          )}
        </ul>}
    </div>
  )
}

export default BlogInfo