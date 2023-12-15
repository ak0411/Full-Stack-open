import { useNavigate } from 'react-router-dom'

const LoginForm = ({ login }) => {
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    login({ variables: { username, password } })

    event.target.username.value = ''
    event.target.password.value = ''
    navigate('/books')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input type='text' name='username' autoComplete='off' />
        </div>
        <div>
          password
          <input type='password' name='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm