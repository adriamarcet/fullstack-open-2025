import { useState } from 'react';
  
import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";
  
function App() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);
  
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10 
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  };

  function logStatus(updatedLeft, updatedRight, updatedTotal) {
    console.log(`
      Left clicks: ${updatedLeft}
      Right clicks: ${right}
      Total clicks: ${total}
      All clicks: ${allClicks}
    `);
  }


  function handleLeftClick() {
    setAll(allClicks.concat('L'));
    
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right) 
    logStatus(updatedLeft)
  }
  
  function handleRightClick() {
    setAll(allClicks.concat('R'));
    const updateRight = right + 1;
    setRight(updateRight);
    logStatus(left, updateRight)
  }

  return (
    <>
      <Header course={course.name} />
      <Content 
        parts={course.parts}
      />
      <Total parts={course.parts} />
      <hr />
      {left} <button onClick={handleLeftClick}>Left click</button>
      <button onClick={handleRightClick}>Right click</button> {right}
    </>
  )
}

export default App
  