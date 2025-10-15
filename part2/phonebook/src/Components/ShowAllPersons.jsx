const ShowAllPersons = ({data}) => {
    return (
        <ul>
          {
            data.map(person => {
              return <li key={person.id}>{person.name}{person.phone && ` - ${person.phone}`}</li>
          })
          }
        </ul>
    )
}

export default ShowAllPersons