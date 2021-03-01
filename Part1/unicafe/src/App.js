import React, {useState} from 'react';
import './App.css';

const Button = ({handleClick, text}) => <button onClick = {handleClick}>{text}</button>

const Statistics = ({values: {total, bad, good, neutral}}) => {

  const percentage = (value) => {
    return value / total * 100
  }
  const average = () => {
    return total / 3
  }
  if (!total) {
    return (
      <div>
        <h2>Statistics:</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics:</h2>
      
      <p>Average: {!total ? "" : average() }</p>
      <p>Positive: {!total ? "" : `${percentage(good)}%`}</p>
      <p>Negative: {!total ? "" : `${percentage(bad)}%`}</p>
      <p>Neutral: {!total ? "" : `${percentage(neutral)}%`}</p>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => {setGood(good + 1)}
  const handleNeutral = () => {setNeutral(neutral + 1)}
  const handleBad = () => {setBad(bad + 1)}
  let values = {
                good: good,
                neutral: neutral,
                bad: bad,
                total: good + neutral + bad
               }

  return (
    <div>
      <h1>Total Feedback: {values.total}</h1>
      <p>Good: {good}</p>
      <p>Bad: {bad}</p>
      <p>Neutral: {neutral}</p>
      <Statistics values={values} />
      <h1>Give Feedback:</h1>
      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>
    </div>
  )
}

export default App;
