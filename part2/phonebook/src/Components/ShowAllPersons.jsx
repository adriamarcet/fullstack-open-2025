const ShowAllPersons = ({data: persons}) => {
    return (
        <ul>
          {
            persons.map(person => {
              return <li key={person.id}>{person.name}{person.phone && ` - ${person.phone}`}</li>
          })
          }
        </ul>
    )
}

export default ShowAllPersons