function Statistics(props) {
  const {good, neutral, bad} = props;
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : ((good - bad) / total).toFixed(2);
  const positivePercentage = total === 0 ? 0 : ((good / total) * 100).toFixed(1);
  
  if(good === 0) {
    return (
      <>
        <h2>Our statistics</h2>
        <p>No feedback given yet.</p>
      </>
    )
  }
  return (
    <>
      <h2>Our statistics</h2>
      <ul>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
        <li>the total number of collected feedback: {total} </li>
        <li>the average score: {average}</li>
        <li>the percentage of positive feedback: {positivePercentage}%</li>
      </ul>
    </>
  )
}

export default Statistics;