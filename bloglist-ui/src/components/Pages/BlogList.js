import BlogForm from '../BlogForm/BlogForm'
import Togglable from '../Togglable'
import Blogs from '../Blogs/Blogs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setNotification } from '../../reducers/notificationReducer'
const BlogList = () => {
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/')
            dispatch(
                setNotification(
                    {
                        message: 'Please login to access blogs',
                        type: 'error',
                    },
                    2000
                )
            )
        }
    }, [user])
    return (
        <div>
            <h2>blogs list</h2>

            <div>
                <Togglable buttonLabel="new note">
                    <BlogForm />
                </Togglable>
                <div>
                    <Blogs />
                </div>
            </div>
        </div>
    )
}
export default BlogList
