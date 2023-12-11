import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const menuStyle = {
    padding: 5,
    backgroundColor: 'lightblue',
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name} logged in{' '}
      <button id="logout-button" onClick={() => dispatch(logout())}>
        logout
      </button>
    </div>
  )
}

export default Menu