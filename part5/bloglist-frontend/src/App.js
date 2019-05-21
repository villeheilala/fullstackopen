// fullstackopen 2019 course work 5.1-5.4
// ville heilala

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    if (username && password) {
      try {
        const user = await loginService.login({
          username, password
        })

        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setMessage({
          text: "Log in error",
          type: "warning"
        })
      }
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        "title": newBlogTitle,
        "author": newBlogAuthor,
        "url": newBlogUrl
      }

      const savedBlog = await blogService.create(newBlog)

      setBlogs([...blogs, savedBlog])
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')

      setMessage({ text: "New blog added" })
      setTimeout(() => {
        setMessage({})
      }, 5000)

    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
       <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
       <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const newBlogForm = () => (
    <form onSubmit={handleCreate}>
      <div>
        Title:
        <input
          type="text"
          value={newBlogTitle}
          name="newBlogTitle"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newBlogAuthor}
          name="newBlogAuthor"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          value={newBlogUrl}
          name="newBlogUrl"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form >
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    window.location.reload()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Message text={message.text} type={message.type} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Bloglist</h2>
      <Message text={message.text} type={message.type} />
      <p>{user.name} logged in <button onClick={logOut}>Logout</button></p>
      {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App