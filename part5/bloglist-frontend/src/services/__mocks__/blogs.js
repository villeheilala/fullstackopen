/* eslint-disable no-unused-vars */
const blogs = [
  {
    author: 'Paavo Plokaaja',
    id: '5be92cf02c48d5d19d836ab8',
    likes: 69,
    title: 'Maustemestarin Matkakirja',
    url: 'http://www.example.com',
    user: {
      id: 'flkj3904w78fe7rghiuhf',
      user: 'Matti Mainio',
      username: 'matti.mainio'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  let token = `bearer ${newToken}`
}

export default { getAll, setToken }