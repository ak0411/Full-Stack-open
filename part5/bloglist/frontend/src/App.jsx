import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import ShowUser from './components/ShowUser'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notify = ({ isError, message }) => {
    setNotification({
      isError: isError,
      message: message
    });
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginUser = (userObject) => {
    loginService
      .login(userObject)
      .then(returnedUser => {
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(returnedUser)
        )
        blogService.setToken(returnedUser.token)
        setUser(returnedUser)
      })
      .catch(() => {
        Notify({ isError: true, message: 'wrong credentials' })
      })
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog, returnedBlog.user, returnedBlog.user.name)
        setBlogs(blogs.concat(returnedBlog))
        Notify({ isError: false, message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added` })
      })
      .catch(exception => {
        Notify({ isError: true, message: exception.message })
      })
  }

  const onLike = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1}
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        Notify({ isError: false, message: `You liked ${returnedBlog.title} by ${returnedBlog.author}` })
        setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
      })
      .catch(exception => {
        Notify({ isError: true, message: exception.message })
      })
  }

  const byDescLikes = (b1, b2) => b2.likes - b1.likes

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification}/>
        <LoginForm loginUser={loginUser} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <ShowUser user={user} setUser={setUser} />
      <Togglable buttonLabel="new blog" ref={blogFormRef} >
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs
        .sort(byDescLikes)
        .map(blog => <Blog key={blog.id} blog={blog} onLike={onLike} />)
      }
    </div>
  )
}

export default App