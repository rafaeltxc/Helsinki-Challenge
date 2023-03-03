const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const { Contact } = require('./mongoConnection');

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

    Contact.find({}).then(contacts => {
        res.status(201).json(contacts);
    }).catch(err => {
        res.status(500).json({ Error: err.message });
    })
    
})

app.get('/api/persons/info', (req, res) => {
    res.set('Content-Type', 'text/html');

    return Contact.find({}).then(contacts => {
        return res.status(200).end(
            `<p>Phonebook has info for ${ contacts.length } people</p><p>${ new Date() }</p>`
        )
    }).catch(err => {
        res.status(500).json({ Error: err.message });
    })
    
})

app.get('/api/persons/:id', (req, res) => {
    res.set('Content-Type', 'application/json');
    const personId = req.params.id;

    return Contact.findById(personId).then(contact => {
        if(contact != null) {
            return res.status(201).json(contact);
        } else {
            return res.status(404).json({Error: 'Person not found'});
        }
        
    }).catch(err => res.status(500).json({ Error: err.message }))
})

app.post('/api/persons', (req, res) => {
    res.set('Content-Type', 'application/json');
    const person = req.body;
    
    if(!person.name) {
        return res.status(400).json({Error: 'Name missing'});
    } else if(!person.number) {
        return res.status(400).json({Error: 'Number missing'});
    } else {
        const contact = new Contact({
            name: person.name,
            number: person.number
        })
    
        return contact.save().then(contact => {
            return res.status(200).json(contact);
        }).catch(err => res.status(500).json({ Error: err.message }))
    }
})

app.delete('/api/persons/:id', (req, res) => {
    res.set('Content-Type', 'application/json');

    const personId = req.params.id;
    return Contact.findById(personId).then(result => {
        if(result != null) {
            return Contact.deleteOne({ _id: personId }).then(() => res.status(204).end())
                .catch(err => res.status(500).json({ Error: err.message }))
        } else {
            return res.status(404).json({Error: 'Person not found'});
        }
    }).catch(err => res.status(500).json({ Error: err.message }))
})

const PORT = process.env.PORT || 3030;
app.listen(PORT, (err) => {
    err ? console.error(err) : console.log('listening on port:', PORT);
})
