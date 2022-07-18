import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../../services/users'
import { Link } from 'react-router-dom'

const User = () => {
    const [user, setUser] = useState()
    const { userId } = useParams()

    useEffect(() => {
        userService.getUser(userId).then((res) => {
            setUser(res)
        })
    }, [])
    console.log(user)
    if (!user) return null
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>Added blogs</h2>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default User
