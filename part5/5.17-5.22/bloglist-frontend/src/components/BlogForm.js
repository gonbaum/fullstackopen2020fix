import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  // Add a new blog:
  const updateField = e => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value
    })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    createBlog(blogObject)

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })

  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          Title:&nbsp;
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={updateField}
          />
        </div>
        <div>
          Author:&nbsp;
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={updateField}
          />
        </div>
        <div>
          URL:&nbsp;
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={updateField}
          />
        </div>
        <button id='create' type="submit">Create</button>
      </form>
    </div>
  )}

export default BlogForm