import React from 'react'
import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationsReducer'

const AnecdoteForm = (props) => {
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createNewAnecdote(content)
        props.showNotification('Anecdote Succesfully Created')
        setTimeout(()=> {
            props.clearNotification()
        }, 5000)
    }
  
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote" /></div>
          <button>create</button>
        </form>
      </div>
    )
  }    

// The functions passed in mapDispatchToProps must be action creators, that is, functions that return Redux actions.
const mapDispatchToProps = {
    createNewAnecdote,
    showNotification,
    clearNotification,
}  
//Since the component does not need to access the store's state, we can simply pass null as the first parameter to connect.
export default connect(null, mapDispatchToProps)(AnecdoteForm)