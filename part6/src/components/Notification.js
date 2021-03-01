import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notifications
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  else
  return (
    <div style={{display: 'none'}}>
      {notification}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

export default connect(mapStateToProps)(Notification)