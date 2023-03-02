const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const { contact, closeCon } = require('./mongoConnection');

const app = express();

app.use(express.static('build'))

app.use(cors());
app.use(express.json());

morgan.token('type', (req, res) => {
    if(req.method === 'POST') {
    return JSON.stringify(req.body)
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'));

app.get('/api/persons', (req, res) => {
    res.set('Content-Type', 'application/json');

    contact.find({}).then(contacts => {
        res.status(201).json(contacts);
    }).catch(err => {
        res.status(500).json({ Error: err.message });
    })
    
})

app.get('/api/persons/info', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.end(
        `<p>Phonebook has info for ${data.length} people</p><p>${new Date()}</p>`
    );
})

app.get('/api/persons/:id', (req, res) => {
    res.set('Content-Type', 'application/json');
    const personId = req.params.id;
    const person = data.filter(person => person.id === Number(personId))[0];
    res.end(JSON.stringify(person) || JSON.stringify({Error: 'Person not found'}));
})

app.post('/api/persons', (req, res) => {
    res.set('Content-Type', 'application/json');
    const person = req.body;

    if(!person.name) {
        return res.status(400).json({Error: 'Name missing'});
    } else if(!person.number) {
        return res.status(400).json({Error: 'Number missing'});
    }else if(data.find(data => data.name === person.name)) {
        return res.status(400).json({Error: 'Person already exists'});
    }

    let randomId;
    do {
        randomId = Math.round(Math.random() * 100)
    } while(data.find(person => person.id === randomId));

    const newPerson = {
        id: randomId,
        name: person.name,
        number: person.number
    }

    const newList = data.concat(newPerson);
    data = newList;
    res.json(newPerson);

})

app.delete('/api/persons/:id', (req, res) => {
    res.set('Content-Type', 'application/json');

    const personId = Number(req.params.id);
    const person = data.find(person => person.id === personId);
    const newList = data.filter(person => person.id !== personId);

    if(person) {
        data = newList;
        res.status(204).end();
    } else {
        res.status(404).json({Error: 'Person not found'});
    }
})

const PORT = process.env.PORT || 3030;
app.listen(PORT, (err) => {
    err ? console.error(err) : console.log('listening on port:', PORT);
})
