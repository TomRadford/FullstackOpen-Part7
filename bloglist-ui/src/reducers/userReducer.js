import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

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
        const user = await loginService.login({
            username,
            password,
        })
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        dispatch(setUser(user))
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
        dispatch(clearUser())
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogAppUser')
    }
}

export default userSlice.reducer
