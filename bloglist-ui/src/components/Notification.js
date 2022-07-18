import { useSelector } from 'react-redux'
import { Alert } from '@mantine/core'
import { AlertCircle, InfoCircle } from 'tabler-icons-react'

const Notification = () => {
    const notificationObject = useSelector(({ notification }) => notification)

    if (notificationObject.message === null) return null

    if (notificationObject.type === 'info')
        return (
            <Alert icon={<InfoCircle size={16} />} title="Info" color="blue">
                {notificationObject.message}
            </Alert>
        )

    if (notificationObject.type === 'error')
        return (
            <Alert icon={<AlertCircle size={16} />} title="Error!" color="red">
                {notificationObject.message}
            </Alert>
        )
}

export default Notification
