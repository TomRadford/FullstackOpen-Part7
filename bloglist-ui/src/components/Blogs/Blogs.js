import { useSelector } from 'react-redux'
import BlogItem from './BlogItem'

const Blogs = () => {
    const blogs = useSelector(({ blogs }) => blogs)

    return (
        <>
            {blogs.map((blog) => (
                <BlogItem key={blog.id} blog={blog} />
            ))}
        </>
    )
}

export default Blogs
