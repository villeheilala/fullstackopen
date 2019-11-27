import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, getConfig())
  return response.data
}

const remove = async object => {
  const response = await axios.delete(`${baseUrl}/${object.id}`, getConfig())
  return response.data
}

export default { getAll, create, update, remove, setToken, destroyToken }