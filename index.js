const express = require('express')
const app = express()

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

app.get('/info', (req,res) => {
  const date = new Date()
  const dateString = `<p>${date}</p>`
  const titleString = `<p>Puhelinluettelossa on ${persons.length} numeroa </p>`

  res.send(titleString+dateString)

})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
