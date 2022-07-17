import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'
import { userLogout } from './userReducer'

const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => {
        return b.likes - a.likes
    })
}

const handleError = (dispatch, exception) => {
    if (exception.response.data.error === 'Provided token has expired') {
        dispatch(
            setNotification(
                {
                    message: 'User session has expired, please login again.',
                    type: 'error',
                },
                1000
            )
        )
        dispatch(userLogout())
    } else {
        dispatch(
            setNotification(
                {
                    message: 'Failed to create new blog post',
                    type: 'error',
                },
                1000
            )
        )
    }
}

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return sortBlogs(action.payload)
        },
        updateBlogs(state, action) {
            const newBlog = action.payload
            const newBlogs = state.map((blog) =>
                blog.id === newBlog.id ? newBlog : blog
            )
            console.log(newBlogs)
            return sortBlogs(newBlogs)
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        removeBlog(state, action) {
            const blogToRemove = action.payload
            return state.filter((blog) => blogToRemove.id !== blog.id)
        },
    },
})

export const { setBlogs, appendBlog, removeBlog, updateBlogs } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispath) => {
        const blogs = await blogService.getAll()
        dispath(setBlogs(blogs))
    }
}

export const createBlog = (blogObject) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blogObject)
            dispatch(appendBlog(newBlog))
            dispatch(
                setNotification(
                    {
                        message: `a new blog ${newBlog.title} by ${newBlog.author} has been added`,
                        type: 'info',
                    },
                    1000
                )
            )
        } catch (exception) {
            handleError(dispatch, exception)
        }
    }
}

export const deleteBlog = (blogObject) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blogObject)
            dispatch(removeBlog(blogObject))
        } catch (exception) {
            handleError(dispatch, exception)
        }
    }
}

export const updateBlog = (blogObject) => {
    return async (dispatch) => {
        try {
            await blogService.update(blogObject)
            dispatch(updateBlogs(blogObject))
        } catch (exception) {
            handleError(dispatch, exception)
        }
    }
}

export default blogSlice.reducer
