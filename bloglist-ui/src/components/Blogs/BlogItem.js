import { Link } from 'react-router-dom'

const BlogItem = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div style={blogStyle}>
            <div className="blog">
                <div className="blogDetails">
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogItem
