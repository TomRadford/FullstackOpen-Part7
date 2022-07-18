import { userLogout } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const Navigation = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(userLogout())
    }
    const user = useSelector(({ user }) => user)
    return (
        <nav>
            <div>
                {user && (
                    <>
                        {user.name} logged in
                        <button type="submit" onClick={handleLogout}>
                            logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navigation
