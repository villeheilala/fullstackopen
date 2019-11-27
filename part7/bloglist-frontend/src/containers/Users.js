import axios from 'axios'
import React, { useEffect } from 'react'
import User from '../components/User'
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from '../actions'

const getAll = () => {
  const request = axios.get('/api/users')
  return request.then(response => response.data)
}

const Users = () => {
  const users = useSelector(state => state.users);
  const blogs = useSelector(state => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then(users => {
      dispatch(setUsers(users))
    })
  }, [dispatch])

  const blogCount = (user) => blogs.filter(blog => blog.user.username === user.username).length

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Created blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <User key={user.id} name={user.name} blogs={blogCount(user)} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Users
