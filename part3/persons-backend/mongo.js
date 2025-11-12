const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);

if(process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://adriamarcetrovira_db_user:${password}@cluster0.xcuptqd.mongodb.net/characterApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const givenName = process.argv[3];
const givenNumber = process.argv[4];

if(!givenName && !givenNumber) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`
                Name: ${person.name} 
                Number: ${person.number}
            `)
        })
        mongoose.connection.close()
        return;
    })

    return;
}

const person = new Person({
    name: givenName,
    number: givenNumber
})

person.save().then(result => {
    console.log(`Added ${givenName} number ${givenNumber} to phonebook`);
    mongoose.connection.close()
})