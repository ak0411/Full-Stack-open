const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = {
    background: 'lightgrey',
    fontSize: '16px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={
      notification.isError
        ? { ...style, color: 'red' }
        : { ...style, color: 'green' }
    }>
      {notification.message}
    </div>
  )
}

export default Notification