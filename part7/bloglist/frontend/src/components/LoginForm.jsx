import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin} className='my-4'>
      <div className='mb-3'>
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <input
          id='username'
          type='text'
          className='form-control'
          autoComplete='off'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input
          id='password'
          type='password'
          className='form-control'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit' className='btn btn-primary'>
        Login
      </button>
    </form>
  )
}

export default LoginForm
