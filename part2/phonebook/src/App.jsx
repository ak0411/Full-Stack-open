import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons' 
 
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const Notify = (isError, message) => {
    setNotification({
      isError: isError,
      message: message
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setNotification({
          isError: true,
          message: 'Cannot load phonebook'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()   
    const person = persons.find(p => p.name === newName)
    
    if (person) {    
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }
        
        personService
          .update(updatedPerson.id, updatedPerson).then(returnedPerson => {
            setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            Notify(false, `Updated ${returnedPerson.name}`)
          })
          .catch(error => {
            Notify(true, `Information of ${updatedPerson.name} has already been removed from server`)
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          Notify(false, `Added ${returnedPerson.name}`)
        })
        .catch(error => {
          Notify(true, `Failed to add ${newName}`)
        })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(person.id).then(data => {
        setPersons(persons.filter(p => p.id !== person.id))
        Notify(false, `Deleted ${person.name}`)
      })
      .catch(error => {
        Notify(true, `Information of ${person.name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    } 
  }

  return (
    <div>  
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter value={newFilter} onChange={(event) => setNewFilter(event.target.value)} />
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        valueName={newName} 
        onChangeName={(event) => setNewName(event.target.value)} 
        valueNumber={newNumber} 
        onChangeNumber={(event) => setNewNumber(event.target.value)} 
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App