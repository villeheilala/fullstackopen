import React, { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Blogs from './containers/Blogs'
import Users from './containers/Users'
import { useField } from './hooks'
import { setBlogs, setUser, setNotification, clearNotification } from './actions'
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import UserDetails from './components/UserDetails'

const App = () => {
  const [username] = useField('text')
  const [password] = useField('password')
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(setBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user));
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const notify = (message, type = 'success') => {
    dispatch(setNotification(type, message))
    setTimeout(() => dispatch(clearNotification()), 10000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user));
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null));
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username} />
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const padding = { padding: 5 }

  return (
    <div>
      <div>
        <Router>
          <div>
            <div>
              <Link style={padding} to="/blogs">Blogs</Link>
              <Link style={padding} to="/users">User</Link>
              {user ? <em>{user.name} logged in</em> : null}
              <button onClick={handleLogout}>logout</button>
            </div>

            <Notification />

            <Route path="/blogs" render={() => <Blogs />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id" render={( { match }) =>
              <UserDetails id={match.params.id} />
            } />
          </div>
        </Router>
      </div>

    </div>
  )
}

export default App
