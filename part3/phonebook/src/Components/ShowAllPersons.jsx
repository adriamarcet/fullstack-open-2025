
const ShowAllPersons = ({data, handledeletion}) => {  

  return (
      <ul>
        {
          data.map(person => {
            return (
              <li key={person.id} style={{display: "flex", marginBottom: ".5rem", paddingBottom: ".25rem", borderBottom: ".5px solid gainsboro"}}>
                <span style={{flex: "1 auto"}}>{person.name}{person.phone && ` - ${person.phone}`}</span>
                <button onClick={ () => handledeletion(person.id)}>Delete</button>
              </li>
            )
        })
        }
      </ul>
  )
}

export default ShowAllPersons