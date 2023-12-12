import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'


const BlogsView = () => {
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()
  const byDescLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {[...blogs].sort(byDescLikes).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogsView