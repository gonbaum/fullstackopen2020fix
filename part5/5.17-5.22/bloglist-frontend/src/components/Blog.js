import React from 'react'
import Togglable from '../components/Togglable'

const Blog = ({ blog, handleLike, handleDelete }) => {

  const blogComponentRef = React.createRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div className="Blog" style={blogStyle}>
      <Togglable blogTitle={blog.title} blogAuthor={blog.author} showButtonLabel="View" hideButtonLabel="Hide" ref={blogComponentRef} >
        <div className="togledInfo">
          <p> {blog.title} - {blog.author}</p>
          <p>{blog.url}</p>
          <p className="likesInfo">Likes: {blog.likes}<button id="likeButton" onClick={ () => handleLike(blog.id) }>Like</button></p>
          <p>{blog.user.name}</p>
          <button onClick={ () => handleDelete(blog.id) }>Remove</button>
        </div>
      </Togglable>
    </div>

  )}

export default Blog
