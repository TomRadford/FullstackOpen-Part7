import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { useNavigate } from 'react-router-dom'

const handleError = (dispatch, exception) => {
    dispatch(
        setNotification(
            {
                message: 'Wrong username or password',
                type: 'error',
            },
            1000
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

export const userLogin = (username, password) => {
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
        } catch (exception) {
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
