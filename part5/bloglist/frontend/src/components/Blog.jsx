import { useState } from 'react'

const Blog = ({ blog, onLike }) => {
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

  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  const creator = blog.user.username === user.username ? user : blog.user

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <div>likes: {blog.likes} <button onClick={() => onLike(blog)}>like</button></div>
        <div>{creator && creator.name}</div>
      </div>
    </div>
  )
}

export default Blog