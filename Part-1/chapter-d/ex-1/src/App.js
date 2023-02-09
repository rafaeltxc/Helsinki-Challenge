import { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td style={{paddingRight: '15px'}}>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({total, children}) => {
  if(total !== 0) {
    return(
      <div>
        {children}
      </div>
    )
  } 
  
  return (
    <div>
      no feedbacks given
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (good-bad)/all;
  const positive = (good/all)*100;
  
  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button clickHandler={() => setGood(good+1)} text={'good'}/>
        <Button clickHandler={() => setNeutral(neutral+1)} text={'neutral'}/>
        <Button clickHandler={() => setBad(bad+1)} text={'bad'}/>
      </div>
      <div>
        <h2>Statistics</h2>
        <Statistics total={all}>
          <StatisticsLine text={'good'} value={good} />
          <StatisticsLine text={'neutral'} value={neutral} />
          <StatisticsLine text={'bad'} value={bad} />
          <StatisticsLine text={'all'} value={all} />
          <StatisticsLine text={'average'} value={average} />
          <StatisticsLine text={'positive'} value={positive + '%'} />
        </Statistics>
      </div>
    </div>
  )
}

export default App