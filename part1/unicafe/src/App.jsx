import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodFeedback = () => {
    const updatedGood = good + 1;
    return setGood(updatedGood);
  }
  
  const handleNeutralFeedback = () => {
    const updatedNeutral = neutral + 1;
    return setNeutral(updatedNeutral);
  }
  
  const handleBadFeedback = () => {
    const updatedBad = bad + 1;
    return setBad(updatedBad);
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
        </ul>
      </section>
    </>
  )
}

export default App
º