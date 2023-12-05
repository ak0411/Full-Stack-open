import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, onLike, onRemove }) => {
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
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blogContent'>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <div>likes: {blog.likes} <button id="like-button" onClick={() => onLike(blog)}>like</button></div>
        {blog.user && <div>{blog.user.name}</div>}
        {blog.user && blog.user.username === user.username && <button id="remove-button" onClick={() => onRemove(blog)}>remove</button>}
      </div>
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default Blog