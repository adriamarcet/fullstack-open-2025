import { useEffect, useState } from 'react'
import Notification from './Components/Notification/Notification';
import Filter from './Components/Filter';
import AddNewPerson from './Components/AddNewPerson';
import ShowAllPersons from './Components/ShowAllPersons';
import { getAllFromCharacters, createNewFromCharacters, deleteFromCharacters, updateFromCharacters } from './services/characters';

const App = () => {
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [persons, setPersons] = useState([])
  
  useEffect(() => {  
    getAllFromCharacters().then(dataFromCharacters => setPersons(dataFromCharacters))
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const clearInputs = () => {
    setNewName('');
    setNewPhone('');
  };

  const handleMessage = newMessage => {
    setMessage(newMessage)
    setTimeout(() => setMessage(null), 5000);
  };

  const handleErrorMessage = newMessage => {
    setErrorMessage(newMessage);
    setTimeout(() => setErrorMessage(null), 5000);
  }

  const handleNewName = event => setNewName(event.target.value);
  const handleNewPhone = event => setNewPhone(event.target.value);
  const handleSearch = event => setSearch(event.target.value);
  const handledeletion = id => {
    const match = persons.filter(person => person.id === id) 
    const name = match[0].name;

    if (window.confirm(`Beware for ${name} will be deleted. May we proceed with this deletion?`)) {
      deleteFromCharacters(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        handleMessage(`The entry for ${name} has been deleted.`);
      })
      .catch(error => {
        handleErrorMessage(`An error occurred when deleting reference for ${name}. Please try again later. - Error code: ${error.code} - Error status: ${error.status}`);
        console.log('error.messages ', error);
      });
    }
  }

  const handleUpdateAddition = (addition) => {
    if(window.confirm(`This ${addition.name} is already entered. Do you want to update their phone number?` )) {
      const match = persons.find(person => person.name === addition.name);
      const matchUpdated = {...match, number: addition.number}

      updateFromCharacters(match.id, addition).then(() => {
        setPersons(persons.map(person => person.id === match.id ? matchUpdated : person))
        clearInputs();
        handleMessage(`The entry for ${addition.name} has been updated.`)
      }).catch(error => {
        handleErrorMessage(`
          An error occurred when updating reference for ${match.name}. Please try again later. - Error code: ${error.code} - Error status: ${error.status}`)
        console.log('error.messages ', error);
      })
    }
  }

  const enterNewAddition = (event) => {
    event.preventDefault();

    const newCharacterAddition = {
      name: newName,
      number: newPhone,
      important: Math.random() < 0.5
    }
    
    if(persons.some(person => {
      return person.name === newCharacterAddition.name && person.number === newCharacterAddition.number
    })) {
      window.alert(`
        ⚠️

        ${newCharacterAddition.name} already entered. 
        Please try a different one.
      ` )
      return
    }

    if(persons.some(person => {
      return person.name === newCharacterAddition.name && person.number !== newCharacterAddition.number
    })) {
      handleUpdateAddition(newCharacterAddition);
      return
    }

    createNewFromCharacters(newCharacterAddition)
      .then(returnedData => {
        setPersons(persons.concat(returnedData));
        clearInputs();
        handleMessage(`New entry for ${returnedData.name} has been added.`)
    }).catch(error => {
      handleErrorMessage(`An error occurred when creating a reference for ${newCharacterAddition.name}. Please try again later.`)
      console.log('error.message', error.message);
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification data={message} />
      <Notification data={errorMessage} type='error' />
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