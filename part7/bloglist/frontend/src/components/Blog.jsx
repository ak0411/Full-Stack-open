import { useState } from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div style={blogStyle} className="blogContent">
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <div>
          likes: {blog.likes}{' '}
          <button id="like-button" onClick={() => dispatch(likeBlog(blog))}>
            like
          </button>
        </div>
        {blog.user && <div>{blog.user.name}</div>}
        {blog.user && blog.user.username === user.username && (
          <button id="remove-button" onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
