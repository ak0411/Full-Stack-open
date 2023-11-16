import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => {
  return (
    <div>{props.text} {props.state}</div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (state, setState) => {
    console.log('value now', state)
    const newValue = state + 1
    setState(newValue)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => handleClick(good, setGood)} text="good" />
      <Button handleClick={() => handleClick(neutral, setNeutral)} text="neutral" />
      <Button handleClick={() => handleClick(bad, setBad)} text="bad" />
      <Header text="statistics" />
      <Display text="good" state={good} />
      <Display text="neutral" state={neutral} />
      <Display text="bad" state={bad} />
    </div>
  )
}

export default App