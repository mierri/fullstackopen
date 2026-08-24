import { useEffect, useState } from 'react'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'
import Persons from './Persons.jsx'
import phonebookService from './services/phonebook.js'
import Notification from './Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (!confirmed) {
        return
      }

      const changedPerson = {
        ...existingPerson,
        number: newNumber
      }

      phonebookService
        .update(existingPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : returnedPerson
          ))
          showSuccessMessage(`Updated ${returnedPerson.name}`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          if (error.response?.data?.error) {
            showErrorMessage(error.response.data.error)
          } else {
            showErrorMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            )
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          }
        })

      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    phonebookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        showSuccessMessage(`Added ${returnedPerson.name}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        showErrorMessage(error.response?.data?.error || 'Something went wrong')
      })
      
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return
    }

    phonebookService
      .delete(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      }).catch(() => {
        showErrorMessage(`Information of ${person.name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
