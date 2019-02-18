const jwt = require('jsonwebtoken')

const errorHandler = (error, req, res, next) => {
    if(error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    } 
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
        request.token = authorization.substring(7) 
      }
    next()
    }

module.exports = {
    errorHandler,
    tokenExtractor
  }