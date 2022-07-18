import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../reducers/userReducer'

const Layout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        dispatch(userLogout())
    }
    const user = useSelector(({ user }) => user)
    return (
        <main>
            <h1>Yummy UI to go all around here!</h1>
            <Notification />
            {user && (
                <div>
                    user.name is logged in
                    <button type="submit" onClick={handleLogout}>
                        logout
                    </button>
                </div>
            )}
            <Outlet />
        </main>
    )
}

export default Layout
