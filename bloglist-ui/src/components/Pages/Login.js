import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../reducers/userReducer'
import { initializeBlogs } from '../../reducers/blogReducer'

import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const user = useSelector(({ user }) => user)
    useEffect(() => {
        if (user) {
            navigate('/blogs')
        }
    }, [user])

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch(userLogin(username, password))
            setUsername('')
            setPassword('')
            dispatch(initializeBlogs())
        } catch (exception) {
            console.log(exception)
            dispatch(
                setNotification(
                    {
                        message: 'Incorrect username or password',
                        type: 'error',
                    },
                    1000
                )
            )
        }
    }
    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    ></input>
                </div>
                <div>
                    password
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" id="login-button">
                    login
                </button>
            </form>
        </div>
    )
}

export default Login
