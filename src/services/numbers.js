import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request =  axios.get(baseUrl)
    return request.then(response => response.data)
}

const createNew = (newNumber) => {
    const request = axios.post(baseUrl, newNumber)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    return axios.delete(`${baseUrl}\\${id}`)
}

const changeNumber = (id,newObject) => {
    const request = axios.put(`${baseUrl}\\${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, createNew, deleteNumber, changeNumber}