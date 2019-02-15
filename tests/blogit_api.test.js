const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      "title": "React patterns",
      "author": "Michael Chan",
      "url": "https://reactpatterns.com/",
      "likes": 7,
    },
    {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        "likes": 5,
    }
]

beforeEach(async () => {
    await Blog.remove({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('There are six blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
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
  
  const response = await api.get('/api/blogs')
  const blogs = response.body.map(blog => blog.title)

  expect(response.body.length).toBe(initialBlogs.length +1)
  expect(blogs).toContain("New React is now available")

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

afterAll(() => {
    mongoose.connection.close()
})
  
