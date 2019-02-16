const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

describe('Test user router functionality', async () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
      })
    test('User can be added to the database', async () => {
        const initialUsers = await helper.usersInDb()

        const newUser = {
            username: 'Cat123',
            name: 'Jane Doe',
            password: 'secretCode'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(initialUsers.length + 1)
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
    afterAll(() => {
        mongoose.connection.close()
    })
})