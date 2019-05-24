/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({
  handleSubmit,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl }) => {

  NewBlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    newBlogTitle: PropTypes.object.isRequired,
    newBlogAuthor: PropTypes.object.isRequired,
    newBlogUrl: PropTypes.object.isRequired,
    //handleNewTitleChange: PropTypes.func.isRequired,
    //handleNewAuthorChange: PropTypes.func.isRequired,
    //handleNewUrlChange: PropTypes.func.isRequired
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input {...newBlogTitle.bind} />
      </div>
      <div>
        Author:
        <input {...newBlogAuthor.bind}/>
      </div>
      <div>
        Url:
        <input {...newBlogUrl.bind}/>
      </div>
      <button type="submit">Create</button>
    </form >
  )
}

export default NewBlogForm