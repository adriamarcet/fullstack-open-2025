import { useState } from 'react'
import Hello from './Hello.jsx';

function App() {
  const resetPropNameFromOutside = "Adrià"
  const [count, setCount] = useState(0)
  const now = new Date()
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric"
  }
  console.log("I promise to keep the console open all the time during this course, and for the rest of my life when I'm doing web development.")

  return (
    <>
      <Hello name="Maya" />
      <Hello name={resetPropNameFromOutside} />
      <p>Avui és {now.toLocaleDateString("ca", options)}</p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App;