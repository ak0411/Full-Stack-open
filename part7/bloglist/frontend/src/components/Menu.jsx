import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-light rounded my-1'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>Blog App</Link>
        <button type='button' className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navbarCollapse'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <div className='navbar-nav'>
            <Link className='nav-item nav-link' to='/'>Blogs</Link>
            <Link className='nav-item nav-link' to='/users'>Users</Link>
          </div>
          <div className='navbar-nav ms-auto'>
            <span className='navbar-text me-3'>{user.name} logged in</span>
            <button className='btn btn-outline-success' id='logout-button' onClick={() => dispatch(logout())}>
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu