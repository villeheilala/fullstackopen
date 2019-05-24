/* eslint-disable no-unused-vars */
// fullstackopen 2019 course work 5.1-5.4
// ville heilala

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
//import blogService from './services/blogs'
import loginService from './services/login'
import  { useField, useResource } from './hooks'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [blogs, blogService] = useResource('http://localhost:3003/api/blogs')
  //const [newBlogTitle, setNewBlogTitle] = useState('')
  const newBlogTitle = useField('text')
  //const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const newBlogAuthor = useField('text')
  //const [newBlogUrl, setNewBlogUrl] = useState('')
  const newBlogUrl = useField('text')
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  useEffect(() => {
    blogService.getAll()
    //blogService.getAll().then(blogs =>
    //  setBlogs(blogs)
    //)
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
    if (username.value && password.value) {
      try {
        const user = await loginService.login({
          username: username.value, password: password.value
        })

        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        password.reset()
        username.reset()
      } catch (exception) {
        setMessage({
          text: 'Log in error',
          type: 'warning'
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

    const newBlog = {
      'title': newBlogTitle.value,
      'author': newBlogAuthor.value,
      'url': newBlogUrl.value
    }

    const savedBlog = await blogService.create(newBlog)

    savedBlog['user'] = {
      name: user.name,
      username: user.username
    }

    blogService.getAll()
    //setBlogs([...blogs, savedBlog])
    //setNewBlogAuthor('')
    newBlogAuthor.reset()
    //setNewBlogTitle('')
    newBlogTitle.reset()
    //setNewBlogUrl('')
    newBlogUrl.reset()

    setMessage({ text: 'New blog added' })
    setTimeout(() => {
      setMessage({})
    }, 5000)

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username <input name="username" {...username.bind}/>
      </div>
      <div>
        Password<input name="password" {...password.bind}/>
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
      //setBlogs(blogs.sort((a, b) => a.likes - b.likes)) :
      //setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      blogs.sort((a, b) => a.likes - b.likes) :
      blogs.sort((a, b) => b.likes - a.likes)
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
          //handleNewTitleChange={({ target }) => setNewBlogTitle(target.value)}
          //handleNewAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
          //handleNewUrlChange={({ target }) => setNewBlogUrl(target.value)}
          handleSubmit={handleCreate}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={blogService} user={user} />
      )}
    </div>
  )
}

export default App