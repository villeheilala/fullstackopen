/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Button, Label, Icon, List } from 'semantic-ui-react'

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
    <List className="blog" style={blogStyle}>
      <List.Item className="title" onClick={toggleDetails}>
        <List.Header>{blog.title}</List.Header>
        {blog.author}
      </List.Item>
      <div className="details" style={visible}>
        <List>
          <List.Item icon="linkify" content={<a href={blog.url}>{blog.url}</a>} />
        </List>
        <div>
          <Button as="div" labelPosition="left">
            <Label as="a" basic pointing="right">
              {blog.likes}
            </Label>
            <Button icon onClick={like}>
              <Icon name="heart" />
              Like
            </Button>
          </Button>
        </div>
        <br />Added by {blog.user.name}
        <div style={deletable}><Button onClick={deleteBlog} color="red" size="mini">Delete</Button></div>
      </div>
    </List>
  )
}

export default Blog