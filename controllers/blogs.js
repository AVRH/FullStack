const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const errorHandler = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try{
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
  } catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception){
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try{
    const body = request.body
    const res = await Blog.findByIdAndUpdate(
      request.params.id,
      body,
      {new:true},
    )
    response.json(res.toJSON())
  }catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter