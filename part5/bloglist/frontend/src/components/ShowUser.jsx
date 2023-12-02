const ShowUser = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
  )
}

export default ShowUser