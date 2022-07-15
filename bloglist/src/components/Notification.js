const Notification = ({ notificationMessage }) => {
  if (notificationMessage.message === null) return (null)

  if (notificationMessage.type === 'info') return (
    <div className='info'>
      {notificationMessage.message}
    </div>
  )

  if (notificationMessage.type === 'error') return (
    <div className='error'>
      {notificationMessage.message}
    </div>
  )
}







export default Notification