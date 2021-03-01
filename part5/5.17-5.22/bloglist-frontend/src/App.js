import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  // Main blog states:
  const [blogs, setBlogs] = useState([])

  // Notifications:
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Login Implementation:
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const blogFormRef = React.createRef()


  // Fetch initial list of blogs:
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes) // Sort blogs by number ok likes
        setBlogs(sortedBlogs)
      })
  }, [])

  // If user is logged, load logged user from localStorage:
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Login implementation:
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      // Save token to browser local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user),
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )


  // Add Blog:
  const addBlog = async (blogObject) => {
    // 3) We can now hide the form by calling blogFormRef.current.toggleVisibility() after a new blog has been created
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch((exception) => {
        setErrorMessage(`There was an error: ${exception}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const newBlogForm = () => (
    <Togglable showButtonLabel="Create Blog" hideButtonLabel="Cancel" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  // Update likes:
  const handleLike = (id) => {
    const blog = blogs.find((n) => n.id === id)
    const updatedBlog = { ...blog, likes: blog.likes += 1 }

    blogService
      .update(updatedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
        // TODO: Instead of success message, change style of like span text for a few seconds to show the recent like
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch((exception) => {
        setErrorMessage(`There was an error: ${exception}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  // Delete blog post:

  const handleDelete = (id) => {
    const receivedBlog = blogs.filter((blog) => blog.id === id)
    if (window.confirm(`Remove ${receivedBlog[0].title} by ${receivedBlog[0].author}?`)) {
      blogService
        .deletePost(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
          setSuccessMessage(
            'Blog post succesfully deleted',
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch((exception) => {
          setErrorMessage(`There was an error: ${exception}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>

      <Notification errorMessage={errorMessage} successMessage={successMessage} />

      {user === null
        ? loginForm()
        : (
          <div>
            <h2>Blogs</h2>
            <span>
              {user.name}
              {' '}
              logged in&nbsp;
            </span>
            <button onClick={handleLogout}>logout </button>
            {newBlogForm()}
            <div id="containerBlogs">
              {blogs.map((blog, index) => <Blog key={index} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />)}
            </div>
          </div>
        )}

      <Footer />

    </div>
  )
}

export default App
