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
      .catch(exception => {
        Notify({ isError: true, message: 'wrong credentials' })
      })
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log('success')
        Notify({ isError: false, message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added` })
      })
      .catch(exception => {
        console.log('catch exception:', exception.message)
        Notify({ isError: true, message: exception.message })
      })
  }

  const Notify = ({ isError, message }) => {
    setNotification({
      isError: isError,
      message: message
    });
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App