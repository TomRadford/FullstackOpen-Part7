import { useSelector } from 'react-redux'

const Notification = () => {
    const notificationObject = useSelector(({ notification }) => notification)

    if (notificationObject.message === null) return null

    if (notificationObject.type === 'info')
        return <div className="info">{notificationObject.message}</div>

    if (notificationObject.type === 'error')
        return <div className="error">{notificationObject.message}</div>
}

export default Notification
