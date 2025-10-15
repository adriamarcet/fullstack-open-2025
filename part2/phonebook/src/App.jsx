import { useEffect, useState } from 'react'
import Filter from './Components/Filter';
import AddNewPerson from './Components/AddNewPerson';
import ShowAllPersons from './Components/ShowAllPersons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {  
    axios
      .get('http://localhost:3001/characters')
      .then(response => {
        setPersons(response.data)
    }) 
    }, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const handleNewName = event => setNewName(event.target.value);
  const handleNewPhone = event => setNewPhone(event.target.value);
  const handleSearch = event => setSearch(event.target.value);
  
  const enterNewAddition = (event) => {
    event.preventDefault();

    const nameAddition = {
      name: newName,
      phone: newPhone,
      important: Math.random() < 0.5
    }
    
    if(persons.some(person => person.name === nameAddition.name)) {
      window.alert(`
        ⚠️

        ${nameAddition.name} already entered. 
        Please try a different one.
      ` )
      return

    }

    axios
      .post('http://localhost:3001/characters', nameAddition)
      .then(response => {
        console.log('response from axios payload post', response.data);
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewPhone('');
    })
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