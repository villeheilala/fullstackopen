import React from 'react'

const NewBlogForm = ({
    handleSubmit,
    newBlogTitle,
    newBlogAuthor,
    newBlogUrl,
    handleNewTitleChange,
    handleNewAuthorChange,
    handleNewUrlChange}) => (
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

export default NewBlogForm