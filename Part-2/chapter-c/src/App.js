import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForms from './components/PersonForm';

import { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const personsList = filter.length > 0 ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons;

  const onChangeName = event => {
    setNewName(event.target.value);
  }

  const onChangeNumber = event => {
    setNewNumber(event.target.value);
  }

  const onChangeFilter = event => {
    setFilter(event.target.value);
  }

  const submitHandler = event => {
    event.preventDefault();

    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {;
      alert('Person already in the list');
      return
    }

    const body = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(body));
    setNewName('');
    setNewNumber('');
  }

  useEffect(() => {
    axios.get('http://localhost:3030/persons/').then(resolve => {
      setPersons(resolve.data);
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={onChangeFilter}/>
      <div>
        <h2>Add a new</h2>
        <PersonForms submitHandler={submitHandler} newName={newName} onChangeName={onChangeName} newNumber={newNumber} onChangeNumber={onChangeNumber}/>
      </div>
      <h2>Numbers</h2>
      <Persons list={personsList}/>
    </div>
  )
}

export default App