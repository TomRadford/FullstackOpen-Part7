import BlogForm from '../BlogForm/BlogForm'
import Togglable from '../Togglable'
import Blogs from '../Blogs/Blogs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BlogList = () => {
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
