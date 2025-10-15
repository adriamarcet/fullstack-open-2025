import { useEffect, useState } from 'react'
import Filter from './Components/Filter';
import AddNewPerson from './Components/AddNewPerson';
import ShowAllPersons from './Components/ShowAllPersons';
import { getAllFromCharacters, createNewFromCharacters, deleteFromCharacters } from './services/characters';

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {  
    getAllFromCharacters().then(dataFromCharacters => setPersons(dataFromCharacters))
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const handleNewName = event => setNewName(event.target.value);
  const handleNewPhone = event => setNewPhone(event.target.value);
  const handleSearch = event => setSearch(event.target.value);
  const handleDelition = id => {
    const match = persons.filter(person => person.id === id) 
    const name = match[0].name;

    window.confirm(`Beware for ${name} will be deleted. May we proceed with this delition?`) && 
      deleteFromCharacters(id).then(() => getAllFromCharacters().then(dataFromCharacters => setPersons(dataFromCharacters)))
  }

  const enterNewAddition = (event) => {
    event.preventDefault();

    const newCharacterAddition = {
      name: newName,
      phone: newPhone,
      important: Math.random() < 0.5
    }
    
    if(persons.some(person => person.name === newCharacterAddition.name)) {
      window.alert(`
        ⚠️

        ${newCharacterAddition.name} already entered. 
        Please try a different one.
      ` )
      return
    }

    createNewFromCharacters(newCharacterAddition)
      .then(returnedData => {
        setPersons(persons.concat(returnedData));
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
        { persons.length === 0 && <p>Anyone here, sorry</p>}
        { persons.length > 0 && <ShowAllPersons data={persons} handleDelition={handleDelition} />}
      </section>
    </div>
  )
}

export default App