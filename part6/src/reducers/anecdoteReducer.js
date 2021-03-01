import AnecdoteService from '../services/Anecdote'

/* BEFORE BACKEND: 
Initialize state here:

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]  

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} */

// Define here action creators:

export const initializeAnecdotes = anecdotes => {
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  })
  }
}

export const createNewAnecdote = anecdote => {
  return async dispatch => {
    const newNote = await AnecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newNote
    })
  }
}

export const increaseVoteCount = anecdote => {
  return async dispatch => {
    const updatedNote = await AnecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedNote
    })  
  }
}

// Define reducer here:

// BEFORE BACKEND: const initialState = anecdotesAtStart.map(asObject)

const AnecdotesReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  // Create here switch statement for different actions:
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      // Create new state container and map original state. Filter the selected item with an if statement, edit it, and return it
      const updatedItems = state.map(item => {
        if(item.id === action.data.id){
          return { ...item, votes: item.votes + 1 }
        }
        return item
      })
      return updatedItems
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    default: 
      return state
  }
}

export default AnecdotesReducer