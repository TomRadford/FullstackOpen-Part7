import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const handleError = (dispatch, exception) => {
    dispatch(
        setNotification(
            {
                message: exception.response.data.error,
                type: 'error',
            },
            2000
        )
    )
}

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state, action) {
            return null
        },
    },
})

export const { setUser, clearUser } = userSlice.actions

export const userLogin = (username, password, setError) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username,
                password,
            })

            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            dispatch(setUser(user))
            dispatch(initializeBlogs())
        } catch (exception) {
            setError(true)
            handleError(dispatch, exception)
        }
    }
}

export const userCreate = (
    username,
    password,
    name,
    setError,
    setShowRegister
) => {
    return async (dispatch) => {
        try {
            await userService.create({
                username,
                password,
                name,
            })

            const user = await loginService.login({
                username,
                password,
            })

            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            dispatch(setUser(user))
            dispatch(initializeBlogs())
            setShowRegister(false)
        } catch (exception) {
            setError(true)
            handleError(dispatch, exception)
        }
    }
}

export const restoreUser = (user) => {
    return async (dispatch) => {
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        window.location.pathname = '/'
        dispatch(clearUser())
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogAppUser')
    }
}

export default userSlice.reducer
