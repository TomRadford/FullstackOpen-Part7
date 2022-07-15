import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs, blogs }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => setVisible(!visible)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const handleUpdateBlog =  () => {

    blog.likes = blog.likes + 1
    blogService.update(blog)
    setLikes(blog.likes)
    let newBlogs = blogs.filter(blogObject => {
      return blogObject.id !== blog.id
    })
    newBlogs = newBlogs.concat(blog)
      .sort((a,b) => {
        return b.likes - a.likes
      })
    setBlogs(newBlogs)
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog)
      const newBlogs = blogs.filter(blogObject => {
        return blogObject.id !== blog.id
      })
      setBlogs(newBlogs)
    }
  }

  const deleteBlog = () => {
    if (user.username === blog.user.username) {

      return (
        <button onClick={handleDeleteBlog}>remove</button>
      )}
  }


  return (
    <div style={blogStyle}>
      <div className='blog'>
        <div className='blogDetails'>{blog.title} {blog.author}</div>
        <button id='view' style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
        <div style={showWhenVisible} className='blogInfo'>
          {blog.url}<br/>
          likes <span id='likes'>{likes}</span>
          <button id='like-button' onClick={handleUpdateBlog}>like</button> <br/>
          {deleteBlog()}
        </div>
      </div>
    </div>

  )
}

export default Blog