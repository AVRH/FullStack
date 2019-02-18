const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const errorHandler = require('../utils/middleware')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user',{username: 1, name: 1 , id: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)   
    if (!request.token || !decodedToken.id) {      
      return response.status(401).json({ error: 'token missing or invalid' })    
    }
    const user = await User.findById(decodedToken.id)
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    }
    const blog = new Blog(newBlog)
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
    
  } catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  //find the blog from database
  const blog = await Blog.findById(request.params.id)
  //decode access token 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  //if token does not exist or does not have valid id
  //return error message
  if(!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
 //if blog's user id and the access token id don't match
 //return error message
 if(blog.user.toString()  !== decodedToken.id.toString()){
  return response.status(401).json({ error: 'Not authorized to delete this blog' })
 }
  try{
    //find the user from database
    const user = await User.findById(decodedToken.id)
    //delete blog being deleted from user's blog list
    user.blogs = user.blogs.filter(b => b.id !== blog.id)
    //save user
    await user.save()
    //delete blog
    await Blog.findByIdAndRemove(blog.id)

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