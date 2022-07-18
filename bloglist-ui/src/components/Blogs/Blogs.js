import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
    const blogs = useSelector(({ blogs }) => blogs)

    return (
        <>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </>
    )
}

export default Blogs
