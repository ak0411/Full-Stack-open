import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div
      id='notification'
      className={
        notification.isError
          ? 'alert alert-danger'
          : 'alert alert-success'
      }
      role='alert'
    >
      {notification.message}
    </div>
  )
}

export default Notification
