import BlogForm from '../BlogForm/BlogForm'
import Togglable from '../Togglable'
import Blogs from '../Blogs/Blogs'
import { Title } from '@mantine/core'

const BlogList = () => {
    return (
        <>
            <Title order={2} mb={4} align="center">
                Blog posts
            </Title>

            <div>
                <Togglable buttonLabel="new note">
                    <BlogForm />
                </Togglable>
                <div>
                    <Blogs />
                </div>
            </div>
        </>
    )
}
export default BlogList
