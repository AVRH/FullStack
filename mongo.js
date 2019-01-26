const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb://test:${password}@ds213645.mlab.com:13645/mongo_practice`
mongoose.connect(url, { useNewUrlParser: true })

const personSchema = {
    name:String,
    number: String,
  }

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
  
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(response => {
    console.log(`saved ${person.name} ${person.number}`)
    mongoose.connection.close()
    
  })
}
if(process.argv.length === 3){
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
    })
    
}
    


