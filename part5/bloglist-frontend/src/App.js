// fullstackopen 2019 course work 5.1-5.4
// ville heilala

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
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

  const blogFormRef = React.createRef()

  const handleCreate = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
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

  const logOut = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    window.location.reload()
  }

  const sortLikes = (asc = true) => () => (
    asc ?
    setBlogs(blogs.sort((a, b) => a.likes - b.likes)) :
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  )

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
      <p>
        Sort by:
        <button onClick={sortLikes()}>Likes (asc)</button>
        <button onClick={sortLikes(false)}>Likes (desc)</button>
      </p>
      <Togglable buttonLabel="Add note" ref={blogFormRef}>
      <NewBlogForm
        newBlogTitle={newBlogTitle}
        newBlogAuthor={newBlogAuthor}
        newBlogUrl={newBlogUrl}
        handleNewTitleChange={({ target }) => setNewBlogTitle(target.value)}
        handleNewAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
        handleNewUrlChange={({ target }) => setNewBlogUrl(target.value)}
        handleSubmit={handleCreate}
      />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
      )}
    </div>
  )
}

export default App