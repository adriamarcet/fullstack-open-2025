import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = event => setNewName(event.target.value);
  
  const addName = (event) => {
    event.preventDefault();
    console.log('form event: ', event); 

    const nameAddition = {
      name: newName
    }

    setPersons(persons.concat(nameAddition));
    setNewName('');
    console.log('persons: ', persons);
    
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <section>
        <h2>Add a name</h2>
        <p>Debug: {newName}</p>
        <form onSubmit={addName}>
          <div>
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" value={newName} onChange={handleNewName} />
            <button type="submit">add</button>
          </div>
        </form>
      </section>
      <section>
        <h2>Numbers</h2>
        <ul>
          {
            persons.map(person => {
              return <li key={person.name}>{person.name}</li>
          })
          }
        </ul>
      </section>
    </div>
  )
}

export default App