// Initialize state here:

const initialState = ''

// Define Actions Creators here:

export const setFilter = (notification) => {
    return {
      type: 'SET_FILTER',
      filter: notification
    }
  }

export const clearFilter = () => {
    return {
      type: 'CLEAR_FILTER',
    }
  }

// Define reducer here:

const NotificationsReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  // Create here switch statement for different actions:
  switch (action.type) {
    case 'SET_FILTER':
          return action.filter
    case 'CLEAR_FILTER':
          return initialState
    default:
      return state
  }
}

export default NotificationsReducer