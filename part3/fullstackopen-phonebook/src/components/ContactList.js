import React from 'react'

const ContactList = ({persons, filter, deletePerson}) => {

    let personsFiltered = persons.filter( ({name}) => name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
        <h2>Contacts</h2>
        {personsFiltered.map(person => 
            <div key={person.id}>
                <p>
                    {person.name} {person.number}
                </p>
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deletePerson(person.id, person.name)} }>Delete</button>
            </div>
        )}
        </div>
    )
}

export default ContactList