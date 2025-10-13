import { useState } from 'react'
import Searchresults from './Searchresults';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Bob Esponja Pantalones Cuadrados', phone: '555-KRAB-001', id: 1 },
    { name: 'Patricio Estrella', phone: '555-ROCK-002', id: 2 },
    { name: 'Calamardo Tentáculos', phone: '555-CLAR-003', id: 3 },
    { name: 'Arenita Mejillas', phone: '555-TREE-004', id: 4 },
    { name: 'Don Cangrejo Krabs', phone: '555-MONE-005', id: 5 },
    { name: 'Gary el Caracol', phone: '555-MEOW-006', id: 6 },
    { name: 'Perla Krabs', phone: '555-MALL-007', id: 7 },
    { name: 'Plankton Sheldon', phone: '555-EVIL-008', id: 8 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const handleNewName = event => setNewName(event.target.value);
  const handleNewPhone = event => setNewPhone(event.target.value);
  const handleSearch = event => {
    console.log('search term: ', search);
    
    setSearch(event.target.value)
  };
  const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0;
  
  const enterNewAddition = (event) => {
    event.preventDefault();

    const nameAddition = {
      name: newName,
      phone: newPhone,
      id: maxId + 1
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
        <h2>Search a name</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
        <label htmlFor="search">Search the address book by person's name</label>
        <input id="search" type="search" value={search} onChange={handleSearch} />
        {search.length > 0 && (
          <>
            <fieldset>
              <strong>Search results:</strong>
              <ul><Searchresults query={search} data={persons}/></ul>
            </fieldset>
          </>
        )}
        </div>
      </section>
      <section>
        <h2>Add a name</h2>
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
              return <li key={person.name}>{person.name}{person.phone && ` - ${person.phone}`}</li>
          })
          }
        </ul>
      </section>
    </div>
  )
}

export default App