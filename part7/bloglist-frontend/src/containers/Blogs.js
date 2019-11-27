import React from 'react'
import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from "react-redux";
import { clearNotification, setNotification, setBlogs } from '../actions'  

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  const newBlogRef = React.createRef()

  const dispatch = useDispatch();
  
  const byLikes = (b1, b2) => b2.likes - b1.likes
  
  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch(setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b)))
    console.log(blogs)
    notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  }

  const createBlog = async (blog) => {
    const createdBlog = await blogService.create(blog)
    newBlogRef.current.toggleVisibility()
    dispatch(setBlogs(blogs.concat(createdBlog)))
    notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      const updatedBlog = await blogService.remove(blog)
      dispatch(setBlogs(blogs.filter(b => b.id !== blog.id)))
      notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
    }
  }

  const notify = (message, type = 'success') => {
    dispatch(setNotification(type, message))
    setTimeout(() => dispatch(clearNotification()), 10000)
  }

  return (
    <div>
      <h2>Blogs</h2>
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