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
        blogService.getBlog(blogId).then(({ data }) => {
            setBlog(data)
            setLikes(data.likes)
        })
    }, [])

    useEffect(() => {
        if (blog) {
            if (likes > blog.likes) {
                dispatch(updateBlog({ ...blog, likes }, navigate))
            }
        }
    }, [likes])

    const handleDeleteBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog, navigate))
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

    const handleComment = async (e) => {
        e.preventDefault()
        const comment = {
            message: e.target.message.value,
        }
        const newComment = await (
            await blogService.createComment(blog.id, comment)
        ).data
        e.target.message.value = ''
        setBlog({ ...blog, comments: blog.comments.concat(newComment) })
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
                <h2>comments</h2>
                <form onSubmit={handleComment}>
                    <input id="message" type="text"></input>
                    <button type="submit">add comment</button>
                </form>
                <ul>
                    {blog.comments.map((comment) => (
                        <li key={comment.id}>{comment.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Blog
