require('dotenv').config()

const Person = require('./models/person');
const PORT = process.env.PORT;

let persons = require('./data.json');
let morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('dist'))
app.use(morgan('tiny'));

morgan.token('tellme', function (req, res) {
    const requestHost = JSON.stringify(req.host);
    const requestOriginUrl = JSON.stringify(req.url);
    const requestMethod = JSON.stringify(req.method);
    const requestBody = JSON.stringify(req.body);
    
    const responseContentType = JSON.stringify(res.get('Content-Type'));
    const responseStatus = res._header ? res.statusCode : undefined;
    
    return `
        Request info: 
            Method - ${requestMethod}
            Origin URL - ${requestOriginUrl}
            Host - ${requestHost}
            Body - ${requestBody}
            
        Response info:
            Content Type - ${responseContentType}
            Status - ${responseStatus}
    `;
})

app.use(morgan(':tellme :response-time'))

app.get('/', (request, response) => {
    response.send('<h1>Hello world from express server</h1>')
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const number_determinant = persons.length > 1 ? `people` : `person`;
    const requestDate = new Date(Date.now()).toUTCString();

    response.send(`
        <p>Phonebook has info for ${persons.length} ${number_determinant}</p>
        <p>${requestDate}</p>
    `)
})

app.listen(PORT, () => {
    console.log('server is running at port ', PORT);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findById(id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log('error', error);
            response.status(400).send({ error: 'malformatted id' })
        })
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    ;

    // const match = persons.find(person => person.id === id);
    // if(match) {
    //     persons = persons.filter(person => person.id !== id);
    //     response.status(204).end()
    // } else {
    //     response.status(404).end()
    // }
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
            error: 'No phone number given'
        })
    }

    Person.findOne({ name: body.name }).then(existingPerson => {
        if (existingPerson) {
            return response.status(400).json({
                error: "Given Name has an exact match"
            })
        }

        const person = new Person({
            name: body.name,
            number: body.number
        })

        person.save().then(savedPerson => {
            response.json(savedPerson)
        }).catch(error => {
            console.error(error)
            response.status(500).json({ error: 'saving failed' })
        })
    }).catch(error => {
        console.error(error)
        response.status(500).json({ error: 'lookup failed' })
    })

    // const person = {
    //     "name": body.name,
    //     "number": body.number,
    //     "id": generateId()
    // };

    // persons = persons.concat(person);
    // response.json(person)
});