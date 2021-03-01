import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  
  
  // Main blog states:
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ 
    title: '', 
    author: '', 
    url: ''
  })

  // Notifications:
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Login Implementation:
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 


  // Fetch initial list of blogs:

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
      setBlogs(blogs)
    )  
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
          'loggedBlogappUser', JSON.stringify(user)
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
    <div>
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username&nbsp;
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password&nbsp;
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>    
    </div>  
  )
  
  // Add a new blog:

  const updateField = e => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value
    });
  };

  const addBlog = async (event) => {
    event.preventDefault()
      try {
      const blogObject = {
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
        }

      await blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog({ 
            title: '', 
            author: '', 
            url: ''
          })
        })
        setSuccessMessage(`${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage(`There was an error: ${exception}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  }

  const newBlogForm = () => (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          Title:&nbsp;
            <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={updateField}
          />
        </div>
        <div>
          Author:&nbsp;
            <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={updateField}
          />
        </div>
        <div>
          URL:&nbsp;
            <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={updateField}
          />
        </div>
        <button type="submit">Create</button>
      </form>    
    </div>  
  )

  return (
    <div>  
      

      <Notification errorMessage={errorMessage} successMessage={successMessage} />

      {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <span>{user.name} logged in&nbsp;</span>
          <button onClick={handleLogout}>logout </button>
          <h2></h2>
          {newBlogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

      <Footer />

    </div>
  )
}

export default App