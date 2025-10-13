import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNewName = event => setNewName(event.target.value);
  const handleNewPhone = event => setNewPhone(event.target.value);
  
  const enterNewAddition = (event) => {
    event.preventDefault();

    const nameAddition = {
      name: newName,
      phone: newPhone
    }
    
    if(persons.some(person => person.name === nameAddition.name)) {
      window.alert(`
        ⚠️

        ${nameAddition.name} already entered. 
        Please try a different one.
      ` )
    } else {
      console.log('persons: ', persons);
      
      setPersons(persons.concat(nameAddition));
      setNewName('');
      setNewPhone('');
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <section>
        <h2>Add a name</h2>
        <p>Debug: {newName}</p>
        <form onSubmit={enterNewAddition} style={{display: 'flex', flexDirection: 'column'}}>
          <fieldset>
            <label htmlFor="name" style={{display: 'flex', flexDirection: 'column'}}>Name</label>
            <input id="name" type="text" value={newName} onChange={handleNewName} />
          </fieldset>
          <fieldset>
            <label htmlFor="phone" style={{display: 'flex', flexDirection: 'column'}}>
              <span>Phone number</span>
              <small>Format: 654321098</small>
            </label>
            <input id="phone" type="tel" value={newPhone} onChange={handleNewPhone} />
          </fieldset>
          <fieldset> 
            <button type="submit">add</button>
          </fieldset>
        </form>
      </section>
      <section>
        <h2>Numbers</h2>
        <ul>
          {
            persons.map(person => {
              return <li key={person.name}>{person.name}{person.phone === undefined ? '' : ` - ${person.phone}`}</li>
          })
          }
        </ul>
      </section>
    </div>
  )
}

export default App