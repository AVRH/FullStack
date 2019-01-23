const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '045-1236543'
  },
  {
    id: 2,
    name: 'Arto Jarvinen',
    number: '040-4323234'
  },
  {
    id: 3,
    name: 'Lea Kutvonen',
    number: '040-4323234'
  },
  {
    id: 4,
    name: 'Martti Tienari',
    number: '09-784232'

  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person){
    res.json(person)
  }else{
    res.status(404).end()
  }
})

app.get('/info', (req,res) => {
  const date = new Date()
  const dateString = `<p>${date}</p>`
  const titleString = `<p>Puhelinluettelossa on ${persons.length} numeroa </p>`

  res.send(titleString+dateString)

})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req,res) => {
  const body = req.body

  if(body.name === undefined || body.number === undefined){
    return res.status(400).json({error: 'Name or number is missing'})
  } 
  if(persons.findIndex(p => p.name === body.name) !== -1){
      return res.status(400).json({ error: 'Name is already in the directory'})
  } 

  const person = {
    id: Math.floor(Math.random()*Math.floor(100)),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  res.json(person)

})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
