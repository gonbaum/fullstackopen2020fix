/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

//check parameters for password and connect to db
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@cluster0-ptdig.mongodb.net/test?retryWrites=true&w=majority`

console.log(url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

//define the schema and model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

//define a test document

/*const person = new Person({
  name: 'Albert Einstein',
  number: '40-213-234',
  date: new Date()
})*/

//Logic:
if (process.argv.length === 5) {
  let personName = process.argv[3]
  let personNumber = process.argv[4]
  const person = new Person({
    name: personName,
    number: personNumber,
    date: new Date()
  })
  //Save document
  person.save().then(response => {
    console.log('contact information saved!')
    mongoose.connection.close()
  })
} else {
  console.log('To save a new contact, please use \'node mongodb.js <password> <contactName> <contactNumber>\'')
}

//Fetch data

Person.find({}).then(result => {
  console.log('Phonebook:')
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})