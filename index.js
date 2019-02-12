const http = require('http')
const cors = require('cors')
const config = require('./utils/config')
const app = require('./app')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})