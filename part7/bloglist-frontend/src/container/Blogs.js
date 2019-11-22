import React from 'react'
import Togglable from '../components/Togglable'
import NewBlog from '../components/NewBlog'
import Blog from '../components/Blog'
import blogService from './services/blogs'

const newBlogRef = React.createRef()

const Blogs = ({ blogs, user }) => {
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