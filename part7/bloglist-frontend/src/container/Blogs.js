import React from 'react'
import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'
import Blog from '../components/Blog'
import blogService from './services/blogs'
import { useDispatch, useSelector } from "react-redux";
import { clearNotification, setNotification, setBlogs } from './actions'  

const Blogs = ({ blogs, user }) => {

  const newBlogRef = React.createRef()

  const dispatch = useDispatch();
  
  const byLikes = (b1, b2) => b2.likes - b1.likes
  
  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch(setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b)))
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const notify = (message, type = 'success') => {
    setNotification(type, message)
    setTimeout(() => clearNotification(), 10000)
  }

  return (
    <div>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {
        blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={likeBlog}
            remove={removeBlog}
            user={user}
            creator={blog.user.username === user.username}
          />
        )
      }
    </div>
  )
}

export default Blogs