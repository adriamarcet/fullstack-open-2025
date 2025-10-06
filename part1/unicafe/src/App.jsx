import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : ((good - bad) / total).toFixed(2);
  const positivePercentage = total === 0 ? 0 : ((good / total) * 100).toFixed(1);

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
        <h2>Our statistics</h2>
        <ul>
          <li>Good: {good}</li>
          <li>Neutral: {neutral}</li>
          <li>Bad: {bad}</li>
          <li>the total number of collected feedback: {total} </li>
          <li>the average score: {average}</li>
          <li>the percentage of positive feedback: {positivePercentage}%</li>
        </ul>
      </section>
    </>
  )
}

export default App
