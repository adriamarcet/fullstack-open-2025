import { useState } from 'react'
import Statistics from './Statistics.jsx';

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

    const handleGoodFeedback = () => {
    const updatedGood = good + 1;
    setGood(updatedGood)
  }
  
  const handleNeutralFeedback = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  }
  
  const handleBadFeedback = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad)
  }

  return (
    <>
      <h1>Give feedback to Unicafe</h1>
      <section>
        <h2>Your feedback</h2>
        <div style={{display: 'flex'}}>
          <div style={{display: 'flex', flexDirection: 'column', flexBasis: '20%', alignItems: 'center'}}>
            <span>{good}</span>
            <button onClick={handleGoodFeedback}>Good</button>
          </div>
        
          <div style={{display: 'flex', flexDirection: 'column', flexBasis: '20%', alignItems: 'center'}}>
              <span>{neutral}</span>
              <button onClick={handleNeutralFeedback}>Neutral</button>
          </div>
    
           <div style={{display: 'flex', flexDirection: 'column', flexBasis: '20%', alignItems: 'center'}}>
              <span>{bad}</span>
              <button onClick={handleBadFeedback}>Bad</button>
          </div>
        </div>
      </section>
      <section>
        <Statistics good={good} neutral={neutral} bad={bad}  />
      </section>
    </>
  )
}

export default App
