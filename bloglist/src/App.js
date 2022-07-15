import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogFrom from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    type: null
  })

  const blogFormRef = useRef()

  const notificationClear = () => {
    setTimeout(() =>
      setNotificationMessage({
        message: null,
        type: null
      }), 2000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      console.log(exception)
      setNotificationMessage({
        message: 'Incorrect username or password',
        type: 'error'
      })
      notificationClear()
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }


  const createBlog = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotificationMessage({
        message: `a new blog ${newBlog.title} by ${newBlog.author} has been added`,
        type: 'info'
      })
      blogFormRef.current.toggleVisibility()
      notificationClear()

    } catch (exception) {
      setNotificationMessage({
        message: 'Failed to create new blog post',
        type: 'error'
      })
      notificationClear()
    }
  }

  const sortBlogs = (blogs) => {
    blogs.sort((a,b) => {
      return b.likes - a.likes
    })
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      sortBlogs(blogs)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const userLocalStorage = window.localStorage.getItem('loggedBlogAppUser')
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {
        user === null
          ?
          <div>
            <h2>log in to application</h2>
            <Notification notificationMessage={notificationMessage} />
            <form onSubmit={handleLogin}>
              <div>
                username
                <input
                  id='username'
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)
                  }>

                </input>
              </div>
              <div>
                password
                <input
                  type="password"
                  id='password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type='submit' id='login-button'>login</button>
            </form>
          </div>
          :
          <div>
            <h2>blogs</h2>
            <Notification notificationMessage={notificationMessage} />
            <p>{user.name} is logged in<button type='submit' onClick={handleLogout}>logout</button></p>
            <div>
              <Togglable buttonLabel='new note' ref={blogFormRef}>
                <BlogFrom createBlog={createBlog} />
              </Togglable>
              <div>
                {blogs.map((blog) => (
                  <Blog key={blog.id}
                    blog={blog}
                    user={user}
                    setBlogs={setBlogs}
                    blogs={blogs}
                  />
                ))}
              </div>
            </div>

          </div>
      }
    </div>
  )
}

export default App
