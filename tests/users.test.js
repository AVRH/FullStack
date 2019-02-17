const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

describe('Test user router functionality', async () => {
   
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
    test('Username must be unique, or error is sent', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'John Doe',
            password: 'salaisuus'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('username must be at least 3 characters long, or error is send', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'r',
            name: 'John Doe',
            password: 'salaisuus'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })
    test('User cannot be added without the username field', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            name: 'John Doe',
            password: 'salaisuus'
        }
        await api 
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    test('user cannot be added without the password field', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'rooting',
            name: 'John Doe',
        }
        await api 
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    test('user cannot be added if password is less than 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'rooting',
            name: 'John Doe',
            password: 'k'
        }
        await api 
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    
})
afterAll(() => {
    mongoose.connection.close()
})