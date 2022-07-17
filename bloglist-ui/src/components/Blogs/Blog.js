import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../../reducers/blogReducer'

const Blog = ({ blog }) => {
    const [likes, setLikes] = useState(blog.likes)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(likes)
        if (likes > blog.likes) {
            console.log(`${likes} more than ${blog.likes} ... updating state`)
            dispatch(updateBlog({ ...blog, likes }))
        }
    }, [likes])

    const handleDeleteBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog))
        }
    }

    const toggleVisibility = () => setVisible(!visible)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    return (
        <div style={blogStyle}>
            <div className="blog">
                <div className="blogDetails">
                    {blog.title} {blog.author}
                </div>
                <button
                    id="view"
                    style={hideWhenVisible}
                    onClick={toggleVisibility}
                >
                    view
                </button>
                <button style={showWhenVisible} onClick={toggleVisibility}>
                    hide
                </button>
                <div style={showWhenVisible} className="blogInfo">
                    {blog.url}
                    <br />
                    likes <span id="likes">{likes}</span>
                    <button
                        id="like-button"
                        onClick={() => setLikes(likes + 1)}
                    >
                        like
                    </button>{' '}
                    <br />
                    <button onClick={handleDeleteBlog}>remove</button>
                </div>
            </div>
        </div>
    )
}

export default Blog
