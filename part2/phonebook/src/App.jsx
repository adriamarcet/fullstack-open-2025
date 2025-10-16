import { useEffect, useState } from 'react'
import Filter from './Components/Filter';
import AddNewPerson from './Components/AddNewPerson';
import ShowAllPersons from './Components/ShowAllPersons';
import { getAllFromCharacters, createNewFromCharacters, deleteFromCharacters, updateFromCharacters } from './services/characters';

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
  const handledeletion = id => {
    const match = persons.filter(person => person.id === id) 
    const name = match[0].name;

    window.confirm(`Beware for ${name} will be deleted. May we proceed with this deletion?`) && 
      deleteFromCharacters(id).then(() => setPersons(persons.filter(person => person.id !== id )))
  }

  const handleUpdateAddition = (addition) => {
    if(window.confirm(`This ${addition.name} is already entered. Do you want to update they phone number?` )) {
      const match = persons.find(person => person.name === addition.name);
      const matchUpdated = {...match, phone: addition.phone}

      updateFromCharacters(match.id, addition).then(() => {
        setPersons(persons.map(person => person.id === match.id ? matchUpdated : person))
      })
    }
  }

  const enterNewAddition = (event) => {
    event.preventDefault();

    const newCharacterAddition = {
      name: newName,
      phone: newPhone,
      important: Math.random() < 0.5
    }
    
    if(persons.some(person => {
      return person.name === newCharacterAddition.name && person.phone === newCharacterAddition.phone
    })) {
      window.alert(`
        ⚠️

        ${newCharacterAddition.name} already entered. 
        Please try a different one.
      ` )
      return
    }

    if(persons.some(person => {
      return person.name === newCharacterAddition.name && person.phone !== newCharacterAddition.phone
    })) {
      handleUpdateAddition(newCharacterAddition);
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
        { persons.length > 0 && <ShowAllPersons data={persons} handledeletion={handledeletion} />}
      </section>
    </div>
  )
}

export default App