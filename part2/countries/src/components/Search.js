import React from 'react'

const Search = ({ text, value, onChange }) => {
  
    return (
        <div>
            <span>{text}</span>
            <input value={value} onChange={onChange}/>
        </div>
    )
}

export default Search
