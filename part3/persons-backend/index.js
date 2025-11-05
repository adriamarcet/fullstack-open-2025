let persons = require('./data.json');
let morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());

app.use(morgan('combined'));

app.get('/', (request, response) => {
    response.send('<h1>Hello world from express server</h1>')
});

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/info', (request, response) => {
    const number_determinant = persons.length > 1 ? `people` : `person`;
    const requestDate = new Date(Date.now()).toUTCString();

    response.send(`
        <p>Phonebook has info for ${persons.length} ${number_determinant}</p>
        <p>${requestDate}</p>
    `)
})

const PORT = 3001;

app.listen(PORT, () => {
    console.log('server is running at port ', PORT);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const match = persons.find(person => person.id === id);

    if(match) {
        response.json(match)
    } else {
        response.status(404).end()
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    const match = persons.find(person => person.id === id);
    if(match) {
        persons = persons.filter(person => person.id !== id);
        response.status(204).end()
    } else {
        response.status(404).end()
    }
});

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body;
    
    if(!body) {
        return response.status(400).json({
            error: 'No information given'
        })
    }

    if(!body.name) {
        return response.status(400).json({
            error: 'No name given'
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error: 'No number given'
        })
    }

    const nameMatch = persons.filter(person => person.name === body.name);

    if(nameMatch.length > 0) {
        return response.status(400).json({
            error: "Given Name has an exact match"
        })
    }
    
    const person = {
        "name": body.name,
        "number": body.number,
        "id": generateId()
    };
    persons = persons.concat(person);
    response.json(person)
});