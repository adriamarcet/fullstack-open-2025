const mongoose = require('mongoose');
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err.message));

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters long'],
        required: [true, 'Name is required']
    },
    number: {
        type: String,
        minlength: [8, 'Phone number must be at least 8 characters long'],
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                // must be at least 8 characters and match 2 or 3 digits, a dash, then digits
                return typeof v === 'string' && v.length >= 8 && /^\d{2,3}-\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number. Use XX-XXXX... or XXX-XXXX...`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString() // ID is an Object in Mongoose
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema);