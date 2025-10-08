import { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...new Uint8Array(anecdotes.length)])
  const indexOfSelectedAnecdote = anecdotes.indexOf(anecdotes[selected]);
  const mostVoted = votes.indexOf(votes.reduce((prev, curr) => prev < curr ? curr : prev));

  const getRandomAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random)    
  }

  const voteDisplayedAnecdote = () => {
    const copy = [...votes];
    copy[indexOfSelectedAnecdote] += 1;
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdotes and votes</h2>
      <p>{anecdotes[selected]}</p>
      <button onClick={getRandomAnecdote}>next anecdote</button>
      <p>-- Anecdote number {selected} has {votes[indexOfSelectedAnecdote]} votes</p>
      <button onClick={voteDisplayedAnecdote}>Vote for this anecdote</button>
      <h3>Most voted anecdote</h3>
      {anecdotes[mostVoted]}
    </div>
  )
}

export default App