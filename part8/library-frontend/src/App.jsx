import { useEffect, useState } from 'react'
import {
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

import { useApolloClient, useMutation } from '@apollo/client'
import { LOGIN } from './queries'


const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)
  const [login, result] = useMutation(LOGIN)

  const padding = {
    padding: 5
  }

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  useEffect(() => {
    const foundToken = window.localStorage.getItem('library-user-token')
    if (foundToken) {
      setToken(foundToken)
    }
  }, [])

  const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
      <div>
        <Link style={padding} to='/authors'>authors</Link>
        <Link style={padding} to='/books'>books</Link>
        {!token
          ? <Link style={padding} to='/login'>login</Link>
          : <>
            <Link style={padding} to='/add'>add book</Link>
            <Link style={padding} to='/recommend'>recommend</Link>
            <button onClick={logout}>logout</button>
          </>
        }
      </div>

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/login' element={<LoginForm login={login} />} />
        <Route path='/recommend' element={<Recommend />} />
      </Routes>
    </div>
  )
}

export default App
