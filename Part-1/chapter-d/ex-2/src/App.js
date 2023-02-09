import { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const ShowMostVoted = ({isShow, children}) => {
  if(isShow) {
    return (
      <div>
        {children}
      </div>
    )
  }

  return(
    <div></div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(8).fill(0));

  const higherNb = Math.max.apply(Math, votes);
  const indexOfHigher = votes.indexOf(higherNb);
  
  const isShow = higherNb === 0 ? false : true;

  const counter = () => {
    let randomNb = 0;
    do {
      randomNb = Math.floor(Math.random() * anecdotes.length);
    } while (randomNb === selected);
    setSelected(randomNb);
  }

  const updateVotes = () => {
    const cp = [...votes];
    cp[selected] += 1;
    setVotes(cp);
  }

  return (
    <div>
      <div>
        <h2>Anecdotes of the day</h2>
        {anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
        <div>
          <Button clickHandler={updateVotes} text={'vote'} />
          <Button clickHandler={counter} text={'next anecdote'} />
        </div>
      </div>
      <div>
        <ShowMostVoted isShow={isShow}>
          <h2>Anecdotes with most votes</h2>
          {anecdotes[indexOfHigher]}
          <p>has {higherNb} votes</p>
        </ShowMostVoted>
      </div>
    </div>
  )
}

export default App