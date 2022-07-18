import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import blogService from '../../services/blogs'

import { deleteBlog, updateBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const Blog = () => {
    const { blogId } = useParams()
    const [blog, setBlog] = useState(null)
    const [likes, setLikes] = useState(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        blogService.getBlog(blogId).then((res) => {
            setBlog(res)
            setLikes(res.likes)
        })
    }, [])

    useEffect(() => {
        if (blog) {
            if (likes > blog.likes) {
                dispatch(updateBlog({ ...blog, likes }))
            }
        }
    }, [likes])

    const handleDeleteBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog))
        }
        navigate('/blogs')
        dispatch(
            setNotification(
                {
                    message: `${blog.title} by ${blog.author} has been deleted`,
                    type: 'info',
                },
                2000
            )
        )
    }
    if (!blog) return null
    return (
        <div>
            <h1> {blog.title}</h1>
            <p>
                <a href={blog.url}>{blog.url}</a>
            </p>
            <div className="blogInfo">
                <span id="likes">{likes}</span> likes
                <button id="like-button" onClick={() => setLikes(likes + 1)}>
                    like
                </button>
                <p>added by {blog.user.name}</p>
                <button onClick={handleDeleteBlog}>remove</button>
            </div>
        </div>
    )
}
export default Blog
