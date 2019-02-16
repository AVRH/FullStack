const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)



beforeEach(async () => {
    await Blog.remove({})

   const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
   const promiseArray = blogObjects.map(blog => blog.save())
   await Promise.all(promiseArray)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('There are six blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})
test('blog identifier is id and not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0]).toHaveProperty('id')

})

test('A new blog can be added', async () => {
  const newBlog = {
    "title": "New React is now available",
    "author": "Katti Matikainen",
    "url": "www.frontendqueen.com",
    "likes": 1
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length +1)
  expect(blogsAtEnd.map(blog => blog.title)).toContain("New React is now available")

})

test('If amount of likes is not given, the amount is set to 0',async () => {
  const newBlog = {
    "title": "New React is now available",
    "author": "Katti Matikainen",
    "url": "www.frontendqueen.com",
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toBe(0)
})

test('If blog is added without required fields, the error is handled correctly', async () => {
  const newBlog = {
    "author": "Katti Matikainen",
    "url": "www.frontendqueen.com",
    "likes": 200
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})

test('A blog can be removed',async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(blogsAtStart.length -1)
})
test('Amount of likes on a blog can be edited', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]
  const likes = {
    likes: blogToEdit.likes + 1
  }
  const response = await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(likes)
  expect(response.body.likes).toBe(blogToEdit.likes +1)
})
afterAll(() => {
    mongoose.connection.close()
})
  
