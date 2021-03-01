require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

/*----------------------
 middlewares definitions
----------------------*/
app.use(express.static('build'))
app.use(express.json())

//custom middleware to log pretty requests
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

//custom middleware to handle unknown routes. Loaded after routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//custom middleware to handle and log errors. Loaded after routes
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
    //handle id format error
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformated id' })
    //handle validation errors
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
  /*The error that is passed forwards is given to the next function as a parameter. 
  If next was called without a parameter, then the execution would simply move onto the next route or middleware. 
  If the next function is called with a parameter, then the execution will continue to the error handler middleware.*/
}

/*----------------------
  Routes definitions
----------------------*/
//Get all notes
  app.get('/api/notes', (req, res) => {
    Note.find({})
    .then(notes => {
      res.json(notes.map(note => note.toJSON())) 
    })
    .catch(error => next(error))
  })

//Get resource by ID
  app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note.toJSON())
        } else {
          response.status(404).end() 
        }
      })
      .catch(error => next(error))
  })

//Create resource

  //helper function to generate ID from array index.
  /*const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }*/
  
  app.post('/api/notes', (request, response, next) => {
    const body = request.body
    //check validity of content
    if (body.content === undefined) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
    
    //response for the request is sent inside of the callback function
    note
      .save()
      .then(savedNote => savedNote.toJSON())
      .then(savedAndFormattedNote => {
        response.json(savedAndFormattedNote)
      })
      .catch(error => next(error))
  })

//Delete resource
  app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

//Updating resource
  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
      content: body.content,
      important: body.important,
    }
    
    /* Notice that the findByIdAndUpdate method receives a regular JavaScript object as its parameter, 
    and not a new note object created with the Note constructor function.*/
    Note.findByIdAndUpdate(request.params.id, note, { new: true }) /* By default, the updatedNote parameter of the event handler receives the original document without the modifications. We added the optional { new: true }parameter, which will cause our event handler to be called with the new modified document instead of the original. */
      .then(updatedNote => {
        response.json(updatedNote.toJSON())
      })
      .catch(error => next(error))
  })

//Middleware loading  
  app.use(unknownEndpoint)
  app.use(errorHandler)

//Define port and listen
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  