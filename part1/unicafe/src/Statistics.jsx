import StatisticLine from './StatisticLine.jsx';
  
function Statistics(props) {
  const {good, neutral, bad} = props;
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : ((good - bad) / total).toFixed(2);
  const positivePercentage = total === 0 ? 0 : ((good / total) * 100).toFixed(1);
  
  if(total === 0) {
    return (
      <>
        <h2>Our statistics</h2>
        <p>No feedback yet</p>
      </>
    )
  }

  return (
    <>
      <h2>Our statistics</h2>
      <ul>
        <li><StatisticLine text="the total number of collected feedback:" value={total} /></li>
        <li><StatisticLine text="good feedback:" value={good} /></li>
        <li><StatisticLine text="neutral feedback:" value={neutral} /></li>
        <li><StatisticLine text="bad feedback:" value={bad} /></li>
        <li><StatisticLine text="average feedback:" value={average} /></li>
        <li><StatisticLine text="positive percentage feedback:" value={positivePercentage} /></li>
      </ul>
    </>
  )
}

export default Statistics;