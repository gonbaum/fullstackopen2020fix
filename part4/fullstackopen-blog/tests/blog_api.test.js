const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    // In situations like this, we use for...of block, that guarantees a specific execution order.
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})

test('posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
 
  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('an id property is present on every post', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('a POST request creates a new blog post', async () => {

  const newBlog = {
    title: "This is a One blog test",
    author: "The Developer: Gonza",
    url: "http://www.arandomur.edu/~rubinson/copyright_violations/ThisIsAOneBlogTest.html",
    likes: 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
})

test('a POST request without likes property it will default to likes zero ', async () => {

    const newBlog = {
      title: 'This is a zero likes post',
      author: 'The Developer: Gonza',
      url: 'http://www.arandomur.edu/~rubinson/copyright_violations/This is a zero likes post.html' 
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(response.body.likes).toEqual(0)
  })

  test('a POST request without title and url responds with 400 bad request ', async () => {

    const newBlog = {
      author: 'The Developer: Gonza',
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })


afterAll(() => {
  mongoose.connection.close()
})