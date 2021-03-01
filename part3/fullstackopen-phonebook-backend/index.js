/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

/*----------------------
 middlewares definitions
----------------------*/
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// custom middleware to handle and log errors. Loaded after routes
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  // handle id format error
  if (error.name === 'CastError') {
    return response.status(400).send( { error: 'malformated id' } )
  // Handle validation errors
  } else if (error.name === 'ValidationError') {
    return response.status(400).json( { error: error.message } )
  }
  next(error)
  /* The error that is passed forwards is given to the next function as a parameter.
     If next was called without a parameter, then the execution would simply move onto the next route or middleware.
     If the next function is called with a parameter, then the execution will continue to the error handler middleware.*/
}

// create body token
morgan.token('body', function(req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Unknown endpoint middleware. Loaded after routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

/* Harcoded data for the beginning of this exercise
let persons = [
      {
        "name": "Arto Hellas",
        "number": "42-43-234345",
        "date": "2020-04-22T09:29:41.577Z",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      }
    ]
*/

/* Routes */

// Main endpoint
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the phonebook backend. Use the endpoint /api/persons to retrieve the contacts</h1>')
})

// Get all contacts
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

// Info route
app.get('/api/info', (req, res) => {
  res.send(`
                <p>Phonebook has information for ${Person.length} people</p>
                <p>${Date()}</p>`)
})

// Get resource by ID
app.get('/api/persons/:id', (request, response, next) => {

  // Old Logic:
  /* const id = Number(request.params.id)
       const person = persons.find(person => person.id === id)
       if (person) {
          response.json(person)
          } else {
          response.status(404).end()
          } */

  Person.findById(request.params.id)
    .then(result => {
      response.json(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})
// Delete resource
app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Create resource
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
    /* } else if (checkDuplicated(body.name)){
      return response.status(400).json({
        error: 'name must be unique'
      })*/
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  // Response for the request is sent inside of the callback function
  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))

  /* Helper function to generate ID
    const generateId = () => {
      const newId =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      return newId
    } */

  /* Helper function to check duplicated entries
    const checkDuplicated = (person) => {
      let existantPerson = persons.filter(e => e.name.toLowerCase() === person.toLowerCase())
      return existantPerson.length > 0
    } */
})

// Update Resource
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  /* Notice that the findByIdAndUpdate method receives a regular JavaScript object as its parameter,
     and not a new note object created with the Note constructor function.*/
  Person.findByIdAndUpdate(request.params.id, person, { new: true }) /* By default, the updatedNote parameter of the event handler receives the original document without the modifications. We added the optional { new: true }parameter, which will cause our event handler to be called with the new modified document instead of the original. */
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
      console.log('Entry updated')
    })
    .catch(error => next(error))
})

// Middleware loading
app.use(unknownEndpoint)
app.use(errorHandler)

// Define PORT start listening
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
