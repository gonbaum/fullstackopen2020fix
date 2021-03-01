// Initialize state here:

const initialState = null

// Define Actions Creators here:

let timeoutID = undefined

export const showNotification = (notification, time) => {
    return dispatch => {
        dispatch({type: 'SHOW_NOTIFICATION', message: notification })
        if (typeof timeoutID === 'number') {
            console.log('timeoutID :' + timeoutID )
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => { dispatch({type: 'CLEAR_NOTIFICATION'}) } , time)
      }
  }

export const clearNotification = () => {
    return {
      type: 'CLEAR_NOTIFICATION',
      message: null
    }
  }
  
// Define reducer here:

const NotificationsReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  // Create here switch statement for different actions:
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
          return action.message
    case 'CLEAR_NOTIFICATION':
          return null
    default:
      return state
  }
}

export default NotificationsReducer