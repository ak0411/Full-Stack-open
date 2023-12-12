import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogsView from './components/BlogsView'
import UsersView from './components/UsersView'
import User from './components/User'
import BlogInfo from './components/BlogInfo'
import Menu from './components/Menu'

import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (user === null) {
    return (
      <div className='container d-flex align-items-center justify-content-center vh-100'>
        <div className='text-center'>
          <h2>Log in to Blog App</h2>
          <Notification />
          <LoginForm />
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <Menu />
      <Notification />
      <Routes>
        <Route path='/' element={<BlogsView />} />
        <Route path='/users' element={<UsersView />} />
        <Route path='/users/:id' element={<User />}/>
        <Route path='/blogs/:id' element={<BlogInfo />}/>
      </Routes>
    </div>
  )
}

export default App