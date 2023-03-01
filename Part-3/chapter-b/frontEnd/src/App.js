import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForms from './components/PersonForm';
import Services from './services/numbers';
import Notification from './components/Notification';

import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [event, setEvent] = useState(null);
  const [err, setErr] = useState(null);

  const personsList = filter.length > 0 ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons;
  const url = '/api/persons';

  const onChangeName = event => {
    setNewName(event.target.value);
  }

  const onChangeNumber = event => {
    setNewNumber(event.target.value);
  }

  const onChangeFilter = event => {
    setFilter(event.target.value);
  }

  const eventHandler = message => {
    setEvent(
      message
    )

    setTimeout(() => {
      setEvent(null);
    }, 5000)
  }

  const errHandler = message => {
    setErr(
      message
    )

    setTimeout(() => {
      setErr(null);
    }, 5000)
  }

  const submitHandler = event => {
    event.preventDefault();

    const body = {
      name: newName,
      number: newNumber
    }

    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const personId = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

      Services.getById(url, personId.id).then(response => {
        if(window.confirm(`${response.name} is already added to phonebook, replace number with a new one?`)) {
          Services.update(url, personId.id, body).then(response => {
            const newList = persons.map(person => person.id !== personId.id ? person : response);
            setPersons(newList);
            
            eventHandler(`Changed ${response.name} number to ${body.number}`)
          })}
      })
      return 
    }
    
    Services.post(url, body).then(response => {
      setPersons(persons.concat(response));
      setNewName('');
      setNewNumber('');

      eventHandler(`Added ${response.name} to the phonebook`)
    }).catch(err => {
      console.log(err.message);
    })
  }

  useEffect(() => {
    Services.getAll(url).then(response => {
      setPersons(response)
    }).catch(err => {
      return err.message;
    })
  }, [])

  const deleteHandler = id => {
    const newList = persons.filter(person => person.id !== id);

    Services.getById(url, id).then(response => {
      if(window.confirm(`Are you sure you want to delete ${response.name}?`))
      Services.deletePersons(url, id).then(() => {
        setPersons(newList);
      })
    }).catch(() => {
      const person = persons.find(person => person.id === id);
      errHandler(`${person.name} number has already been deleted`);
      setPersons(newList);
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={event} err={err} />
      <Filter filter={filter} onChange={onChangeFilter}/>
      <div>
        <h2>Add a new</h2>
        <PersonForms submitHandler={submitHandler} newName={newName} onChangeName={onChangeName} newNumber={newNumber} onChangeNumber={onChangeNumber}/>
      </div>
      <h2>Numbers</h2>
      <Persons list={personsList} handler={deleteHandler}/>
    </div>
  )
}

export default App