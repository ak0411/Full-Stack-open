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
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()   
    const person = persons.find(p => p.name === newName)
    
    if (person !== undefined) {    
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }
        
        personService
          .update(updatedPerson.id, updatedPerson).then(returnedPerson => {
            setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setError(false)
            setNotification(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setError(true)
            setNotification(`Information of ${updatedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
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
          setError(false)
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(person.id)
      .catch(error => {
        console.error(error)
        alert(
          `the person '${person.name}' was already deleted from server`
        )
      })
      setPersons(persons.filter(p => p.id !== person.id))
      setError(false)
      setNotification(`Deleted ${person.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } 
  }

  return (
    <div>  
      <h2>Phonebook</h2>
      <Notification message={notification} isError={error}/>
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