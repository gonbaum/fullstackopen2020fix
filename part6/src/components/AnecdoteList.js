import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { increaseVoteCount } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationsReducer'
import { connect } from 'react-redux'


const AnecdoteList = (props) => {

    // Use the useSelector hook to sort anecdotes before load state:
    /*const anecdotes = useSelector(state => state.anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))    
        .sort((a, b) => (a.votes < b.votes) ? 1 : -1)
            )
    const dispatch = useDispatch()  
  */
    const vote = (anecdote) => {
        props.increaseVoteCount(anecdote)
        props.showNotification(`you voted '${anecdote.content}'`, 2000)
    }
  
    return (
      <div>
        {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        )}
      </div>
    )
  }    

// The functions passed in mapDispatchToProps must be action creators, that is, functions that return Redux actions.
const mapDispatchToProps = {
    increaseVoteCount,
    showNotification,
}  

const mapStateToProps = (state) => {
    const anecdotes = state.anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
        .sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    return {
        anecdotes: anecdotes,
        notifications: state.notifications,
        filter: state.filter,
  }
} 
  
const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedList
//export default AnecdoteList