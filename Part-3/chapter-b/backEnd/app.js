const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

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

let data;
fs.readFile(`${__dirname}/data.json`, 'utf8', (err, response) => {
    err ? data = JSON.stringify(response, null, 2) : data = response;
})

const toJson = (text) => {
    return JSON.stringify(text, null, 2);
}

app.get('/api/persons', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.end(data);
})

app.get('/api/persons/info', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.end(
        `<p>Phonebook has info for ${JSON.parse(data).length} people</p><p>${new Date()}</p>`
    );
})

app.get('/api/persons/:id', (req, res) => {
    res.set('Content-Type', 'application/json');
    const personId = req.params.id;
    const person = toJson(JSON.parse(data).filter(person => person.id === Number(personId))[0]);
    res.end(person || toJson({Error: 'Person not found'}));
})

app.post('/api/persons', (req, res) => {
    res.set('Content-Type', 'application/json');
    const person = req.body;

    if(!person.name) {
        return res.status(400).json({Error: 'Name missing'});
    } else if(!person.number) {
        return res.status(400).json({Error: 'Number missing'});
    }else if(JSON.parse(data).find(data => data.name === person.name)) {
        return res.status(400).json({Error: 'Person already exists'});
    }

    let randomId;
    do {
        randomId = Math.round(Math.random() * 100)
    } while(JSON.parse(data).find(person => person.id === randomId));

    const newPerson = {
        id: randomId,
        name: person.name,
        number: person.number
    }

    const newList = toJson(JSON.parse(data).concat(newPerson));
    fs.writeFile(`${__dirname}/data.json`, newList, (err) => {
        if(err) {
            res.status(500).json({Problem: 'Could not add', Error: err.message})
        }
        res.json(newPerson);
    })
})

app.delete('/api/persons/:id', (req, res) => {
    res.set('Content-Type', 'application/json');

    const personId = Number(req.params.id);
    const person = toJson(JSON.parse(data).filter(person => person.id === personId)[0]);
    const newList = toJson(JSON.parse(data).filter(person => person.id !== personId));

    if(person) {
        fs.writeFile(`${__dirname}/data.json`, newList, (err) => {
            if(err) {
                res.status(500).json({Problem: 'Could not delete', Error: err.message})
            }
            res.status(204).end();
        })
    } else {
        res.status(404).json({Error: 'Person not found'});
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
    err ? console.error(err) : console.log('listening on port:', PORT);
})
