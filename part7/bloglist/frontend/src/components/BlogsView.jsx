import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'


const BlogsView = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()
  const byDescLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {[...blogs].sort(byDescLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogsView