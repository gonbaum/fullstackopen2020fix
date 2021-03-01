import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// 1) The function that creates the component is wrapped inside of a forwardRef function call.
//    This way the component can access the ref that is assigned to it.

// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // 2) We useImperativeHandle hook to make its toggleVisibility function available outside of the component.
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const isBlog = props.blogTitle ? `${props.blogTitle} - ${props.blogAuthor}` : null

  return (
    <div>
      <div style={hideWhenVisible}>
        <p className="mainInfo"> {isBlog} </p>
        <button id='ToggleOn' onClick={toggleVisibility}>{props.showButtonLabel}</button>
      </div>
      <div className="togglableContent" style={showWhenVisible}>
        {props.children}
        <button id='ToggleOff' onClick={toggleVisibility}>{props.hideButtonLabel}</button>
      </div>
    </div>
  )
})
// 3) Continues in the App component

Togglable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable