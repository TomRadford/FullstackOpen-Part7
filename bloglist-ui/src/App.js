import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Login from './components/Pages/Login'
import BlogList from './components/Pages/BlogList'
import UserList from './components/Pages/UserList'

import { initializeBlogs } from './reducers/blogReducer'
import { userLogin, userLogout, restoreUser } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const userLocalStorage =
            window.localStorage.getItem('loggedBlogAppUser')
        if (userLocalStorage) {
            dispatch(restoreUser(JSON.parse(userLocalStorage)))
            dispatch(initializeBlogs())
        }
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Login />} />
                <Route path="blogs" element={<BlogList />} />
                <Route path="users" element={<UserList />} />
                <Route path="*" element={<div>404</div>} />
            </Route>
        </Routes>
    )
}

export default App
