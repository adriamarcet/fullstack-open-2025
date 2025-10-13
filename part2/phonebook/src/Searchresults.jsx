const Searchresults = ({query, data}) => {
    const filteredPersons = data.filter(element => element.name.toLowerCase().includes(query.toLowerCase()));
    
    return filteredPersons.map(person => {
        return <li key={person.name}>{person.name}{person.phone && ` - ${person.phone}`}</li>
    })
}

export default Searchresults;