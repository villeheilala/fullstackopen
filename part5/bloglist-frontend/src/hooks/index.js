/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    bind: {
      type,
      value,
      onChange
    },
    reset: () => setValue(''),
    value
  }
}

export const useResource = (baseUrl) => {
  // eslint-disable-next-line no-unused-vars
  const [resources, setResources] = useState([])

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, resource, config)
    return response.data
  }

  const getAll = () => {
    const request = axios.get(baseUrl)
    request.then(response => setResources(response.data))
  }

  const service = {
    create, setToken, getAll
  }

  return [
    resources, service
  ]
}