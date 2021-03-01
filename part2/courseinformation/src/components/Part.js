import React from 'react'

const Part = ({part}) => {
    return (
        <div>
            <span>{part.name} </span>
            <span>{part.exercises}</span>
        </div>
    )
}

export default Part