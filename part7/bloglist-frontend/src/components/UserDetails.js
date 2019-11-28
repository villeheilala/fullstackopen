import React from 'react'
import { useSelector } from 'react-redux'

const UserDetails = ({ id }) => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const user = users.find(user => user.id === id)

  if ( user === undefined) { 
    return null
  }

  return (
    <div>
      <h2>Blogs</h2>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {blogs.filter(blog => blog.user._id === id).map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserDetails
