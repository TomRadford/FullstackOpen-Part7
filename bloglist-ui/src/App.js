import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs/Blogs'
import Notification from './components/Notification'
import BlogFrom from './components/BlogForm/BlogForm'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogin, userLogout, restoreUser } from './reducers/userReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const blogFormRef = useRef()

    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)

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

    const handleLogout = async () => {
        dispatch(userLogout())
    }

    useEffect(() => {
        const userLocalStorage =
            window.localStorage.getItem('loggedBlogAppUser')
        if (userLocalStorage) {
            dispatch(restoreUser(JSON.parse(userLocalStorage)))
            dispatch(initializeBlogs())
        }
    }, [])

    return (
        <div>
            {user === null ? (
                <div>
                    <h2>log in to application</h2>
                    <Notification />
                    <form onSubmit={handleLogin}>
                        <div>
                            username
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={({ target }) =>
                                    setUsername(target.value)
                                }
                            ></input>
                        </div>
                        <div>
                            password
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                            />
                        </div>
                        <button type="submit" id="login-button">
                            login
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>blogs</h2>
                    <Notification />
                    <p>
                        {user.name} is logged in
                        <button type="submit" onClick={handleLogout}>
                            logout
                        </button>
                    </p>
                    <div>
                        <Togglable buttonLabel="new note" ref={blogFormRef}>
                            <BlogFrom />
                        </Togglable>
                        <div>
                            <Blogs />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
