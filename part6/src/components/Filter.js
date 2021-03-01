import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const content = event.target.value.toLowerCase()
    props.setFilter(content)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

// The functions passed in mapDispatchToProps must be action creators, that is, functions that return Redux actions.
const mapDispatchToProps = {
    setFilter,
}  

export default connect(null, mapDispatchToProps)(Filter)