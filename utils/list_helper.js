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

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return {}
  } else {
    const likesByAuthor = []
    //group blogs by author, and go over the list of blogs for each author
    lodash.forEach(lodash.groupBy(blogs, 'author'), function(value, key) {
      const list = []
      //for each blogs of an author
      lodash.forEach(value, function(key,value){
        //push the amount of likes to a list
        list.push(key['likes'])
      })
      //append the author name and the sum of the likes to the 
      //likesByAuthor list
      likesByAuthor.push({
        author: key,
        likes:lodash.sum(list)
      })
    })

    //find the largest number of likes
    let maxLikes = Math.max.apply(null,likesByAuthor.map(blog => blog.likes))
    //find the author with the most likes
    let favouriteAuthor = likesByAuthor.filter(blog => blog.likes === maxLikes)
  
    return favouriteAuthor[0]

  }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}