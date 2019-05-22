import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visible = { display: showDetails ? '' : 'none' }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      await blogService.deleteBlog(blog.id)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }

  const like = async () => {
    const object = {
      id: blog.id,
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(object)
    blog.likes += 1
  }

  const deletable = { display: blog.user.username === user.username ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div onClick={toggleDetails}>
        {blog.title} ({blog.author})
      </div>
      <div style={visible}>
        URL: {blog.url}
        <br />Likes: {blog.likes}<button onClick={like}>Like</button>
        <br />Added by {blog.user.name}
        <div style={deletable}><button onClick={deleteBlog}>Delete</button></div>
      </div>
    </div>
  )
}

export default Blog