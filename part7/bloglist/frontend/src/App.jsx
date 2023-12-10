import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogsView from './components/BlogsView'
import UsersView from './components/UsersView'

import blogService from './services/blogs'
import userService from './services/users'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from 'react-router-dom'


const App = () => {
  const [users, setUsers] = useState([])
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    userService
      .getAll()
      .then(returnedUsers => {
        setUsers(returnedUsers)
      })
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in{' '}
        <button id="logout-button" onClick={() => dispatch(logout())}>
          logout
        </button>
      </div>
      <Routes>
        <Route path="/" element={<BlogsView />} />
        <Route path="/users" element={<UsersView users={users} />} />
      </Routes>
    </div>
  )
}

export default App