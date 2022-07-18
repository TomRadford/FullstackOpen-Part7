import { Outlet } from 'react-router-dom'
import Notification from './Notification'
import Navigation from './Navigation'

const Layout = () => {
    return (
        <main>
            <Navigation />
            <Notification />
            <Outlet />
        </main>
    )
}

export default Layout
