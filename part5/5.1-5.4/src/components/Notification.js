import React from 'react'

const Notification = ({ errorMessage, successMessage }) => {
    if (successMessage) {
        return (
            <div className="alert alert-dismissible alert-success">
                {successMessage}
            </div>
        )
    }
    else if (errorMessage) {
        return(
            <div className="alert alert-dismissible alert-danger">
                {errorMessage}
            </div>
        )
    } else {
        return null
    }
  }

export default Notification