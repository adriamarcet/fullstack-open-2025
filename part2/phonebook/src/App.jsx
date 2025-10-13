import { useState } from 'react'
import Filter from './Components/Filter';
import AddNewPerson from './Components/AddNewPerson';
import ShowAllPersons from './Components/ShowAllPersons';

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
  const handleSearch = event => setSearch(event.target.value);
  
  const enterNewAddition = (event) => {
    event.preventDefault();

    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0;
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
        <Filter search={search} data={persons} handleSearch={handleSearch} />
      </section>
      <section>
        <h2>Add a name</h2>
        <AddNewPerson 
          action={enterNewAddition} 
          newName={newName} 
          handleNewName={handleNewName} 
          newPhone={newPhone}
          handleNewPhone={handleNewPhone}
        />
      </section>
      <section>
        <h2>Numbers</h2>
        <ShowAllPersons data={persons} />
      </section>
    </div>
  )
}

export default App