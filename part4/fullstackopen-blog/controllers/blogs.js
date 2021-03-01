const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

// Fetch all blog posts

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
    .catch(error => next(error))
})

// Fetch a blog post

blogsRouter.get('/api/blogs', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => next(error))
  })
 
// Create a blog post

blogsRouter.post('/api/blogs', (request, response, next) => {
    const body = request.body

    const blogPost = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0
    })
    if (blogPost.title == null && blogPost.url == null) {
      response.status(400).send('Bad Request')
    } else {
    blogPost
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
    }
  })

  // Delete a blog post

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  // Update a blog post

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blogPost = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes 
    }
    
    // We use omitUndefined option as true, so mongoose only updates defined properties in the request
    const updatedPost = await Blog.findByIdAndUpdate(request.params.id, blogPost, { new: true, omitUndefined: true })
    response.json(updatedPost.toJSON())
  
  })

  module.exports = blogsRouter