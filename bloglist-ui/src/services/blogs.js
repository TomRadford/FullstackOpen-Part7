import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const getBlog = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

const create = async (newObject) => {
    const config = {
        headers: {
            authorization: token,
        },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (newObject) => {
    const config = {
        headers: {
            authorization: token,
        },
    }
    const response = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return response.data
}

const remove = async (newObject) => {
    const config = {
        headers: {
            authorization: token,
        },
    }
    const response = await axios.delete(`${baseUrl}/${newObject.id}`, config)
    return response.data
}

export default { setToken, getAll, getBlog, create, update, remove }
