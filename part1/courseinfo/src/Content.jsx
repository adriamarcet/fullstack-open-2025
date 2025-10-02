import Part from "./Part";

function Content({parts}) {
  return (
    <>
      <Part name={parts[0].name} number={parts[0].exercise} />
      <Part name={parts[1].name} number={parts[1].exercise} />
      <Part name={parts[2].name} number={parts[2].exercise} />
    </>
  )
}

export default Content;