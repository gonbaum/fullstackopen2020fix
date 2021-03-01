import React, {useState} from 'react';

const App = () => {
  const [selected, setSelected] = useState(0)
  let pointsArray = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
  const [points, setPoints] = useState([...pointsArray])

  let createRandom = () => Math.round(Math.random() * (anecdotes.length - 1)) 
  
  console.log(points)

  let handleNext = (e) => {
    e.preventDefault()
    let random = createRandom()
    setSelected(random)
  }
  let handleVote = (selected) => {
    let copy = [...points]
    copy[selected] = copy[selected] + 1
    setPoints(copy)
  }
  let detectWinner = (array) => {
    let findMax = [...array]
    return findMax.indexOf(Math.max(...findMax));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {points[selected]}</p>
      <button onClick={(e) => handleNext(e)}>Next note ></button>
      <button onClick={() => handleVote(selected)}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[detectWinner(points)]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export default App;
