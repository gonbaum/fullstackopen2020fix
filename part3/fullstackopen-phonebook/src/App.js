import React, { useState, useEffect } from 'react'
import AddForm from './components/AddForm'
import ContactList from './components/ContactList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
import './App.css'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newTelephone, setNewTelephone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  // Add some margin
  const divStyle = {
    margin: '10px'
  }

  // Retrieve initial data from contacts
  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  // Add || Update a new contact method
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
    name: newName,
    number: newTelephone,
    date: new Date(),
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        restoreFields()
        setSuccessMessage(
          `${returnedPerson.name} has been succesfully added`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(
          `There was an error and the contact couldn't been added: ${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    //Old check for duplicate for update logic
    /* let existantPerson = persons.filter(e => e.name.toLowerCase() === personObject.name.toLowerCase())
    if (!existantPerson.length > 0) {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        restoreFields()
        setSuccessMessage(
          `${returnedPerson.name} has been succesfully added`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `There was an error and the contact couldn't been added`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    } else {
      if (window.confirm(`${newName} is already included in the list,do you want to update this contact's number?`)) {
        personService
          .update(existantPerson[0].id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existantPerson[0].id ? person : returnedPerson))
            console.log(`${returnedPerson.id} updated`)
            setSuccessMessage(
              `${returnedPerson.name} has been succesfully updated`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `There was an error and the contact couldn't been updated. The contact might be already deleted from the server. Please refresh page.`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        restoreFields()
      } else {
        restoreFields()
      }
    }*/
}

//Delete a contact method
const deletePerson = (id, name) => {
  personService
  .destroy(id)
  .then(res => {
    setPersons(persons.filter(person => person.id !== id))
    setSuccessMessage(
      `${name} has been succesfully deleted`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  })
  .catch(error => {
    setErrorMessage(
      `It seems that '${name}' was already deleted from the server. Please refresh page.`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })
}

//Restore fields
const restoreFields = () => {
  setNewName('')
  setNewTelephone('')
}

  return (
    <div style={divStyle}>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <Filter 
        filter={filter}
        setFilter={setFilter}
      />
      <AddForm 
        addPerson={addPerson}
        newName={newName} 
        setNewName={setNewName}
        newTelephone={newTelephone}
        setNewTelephone={setNewTelephone}
      />
      <ContactList 
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
      
    </div>
  )
}

export default App