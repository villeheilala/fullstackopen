/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({
  handleSubmit,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
  handleNewTitleChange,
  handleNewAuthorChange,
  handleNewUrlChange }) => {

  NewBlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    newBlogTitle: PropTypes.string.isRequired,
    newBlogAuthor: PropTypes.string.isRequired,
    newBlogUrl: PropTypes.string.isRequired,
    handleNewTitleChange: PropTypes.func.isRequired,
    handleNewAuthorChange: PropTypes.func.isRequired,
    handleNewUrlChange: PropTypes.func.isRequired
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input
          type="text"
          value={newBlogTitle}
          name="newBlogTitle"
          onChange={handleNewTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={newBlogAuthor}
          name="newBlogAuthor"
          onChange={handleNewAuthorChange}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          value={newBlogUrl}
          name="newBlogUrl"
          onChange={handleNewUrlChange}
        />
      </div>
      <button type="submit">Create</button>
    </form >
  )
}

export default NewBlogForm