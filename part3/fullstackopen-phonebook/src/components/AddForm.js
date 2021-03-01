import React from 'react'

const AddForm = ({addPerson, newName, setNewName, newTelephone, setNewTelephone}) => {


    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handleTelephoneChange = (event) => {
        setNewTelephone(event.target.value)
    }

  return(
    <div>
        <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
      <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newTelephone} onChange={handleTelephoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddForm