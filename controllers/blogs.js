const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const errorHandler = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user',{username: 1, name: 1 , id: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: body.userId
  }
  const blog = new Blog(newBlog)
  const user = await User.findById(body.userId)
  try{
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
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