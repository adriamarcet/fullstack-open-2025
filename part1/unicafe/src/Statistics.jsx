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
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text="the total number of collected feedback:" value={total} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="good feedback:" value={good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral feedback:" value={neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad feedback:" value={bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average feedback:" value={average} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive percentage feedback:" value={positivePercentage} /></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Statistics;