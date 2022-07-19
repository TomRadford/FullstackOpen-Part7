import { Link } from 'react-router-dom'
import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Box,
    MediaQuery,
} from '@mantine/core'

const BlogItem = ({ blog }) => {
    return (
        <>
            <MediaQuery largerThan="xs" styles={{ width: 340, margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Image src={blog.ogImage} />
                    </Card.Section>
                    <Group
                        position="apart"
                        style={{
                            marginTop: 5,
                        }}
                    >
                        <Text weight={500}>
                            {blog.title}{' '}
                            <Text weight={300} size="sm" component="span">
                                by {blog.author}
                            </Text>
                        </Text>

                        <Link
                            to={`/users/${blog.user.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Badge color="blue" variant="light">
                                {blog.user.name}
                            </Badge>
                        </Link>
                        <Link
                            to={`/blogs/${blog.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                variant="light"
                                color="blue"
                                fullWidth
                                style={{ marginTop: 14 }}
                            >
                                View
                            </Button>
                        </Link>
                    </Group>
                </Card>
            </MediaQuery>
        </>
    )
}

export default BlogItem
