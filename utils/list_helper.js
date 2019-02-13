const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  if(blogs.length === 0){
    return 0
  } else {
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(add, 0)
  }
  function add(a,b) {
    return a + b
  }
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return {}
  } else {
    let maxLikes = Math.max.apply(null,blogs.map(blog => blog.likes))
    let favoriteBlog = blogs.filter(blog => blog.likes === maxLikes)
    return favoriteBlog[0]
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return {}
  } else {
    let blogsByAuthor = lodash.orderBy(lodash.groupBy(blogs, 'author'),'length')
    const authorWithMostBlogs = lodash.takeRight(blogsByAuthor)
    const result = {
      name: authorWithMostBlogs[0][0].author,
      blogs: authorWithMostBlogs[0].length
    }
  return result
  }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}