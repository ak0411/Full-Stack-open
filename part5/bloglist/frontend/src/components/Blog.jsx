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

  const creator = typeof blog.user === 'object' ? blog.user : user

  return (
    <div style={blogStyle} className='blogContent'>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <div>likes: {blog.likes} <button onClick={() => onLike(blog)}>like</button></div>
        {creator && <div>{creator.name}</div>}
        {creator.username === user.username && <button onClick={() => onRemove(blog)}>remove</button>}
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