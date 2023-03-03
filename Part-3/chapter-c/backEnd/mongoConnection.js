require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
mongoose.connect(uri).then(() => {
    console.log('Connected to mongodb');
}).catch(err => {
    console.log('could not connect to mongodb', err.message);
})

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = {
    Contact: mongoose.model('Contact', contactSchema)
}


//Exercise 1

// const contact = mongoose.model('Contact', contactSchema);
// const isName = new RegExp(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
// if(process.argv.length > 3) {
//     if(process.argv.length > 4) {
//         contact.find({ name: process.argv[3], number: process.argv[4] }).then(contact => {
//             console.log(contact);
//             mongoose.connection.close();
//         }).catch(err => {
//             console.log('could not find contacts', err.message);
//         })
//     } else {
//         if(isName.test(process.argv[3])) {
//             contact.find({ name: process.argv[3] }).then(contact => {
//                 console.log(contact);
//                 mongoose.connection.close();
//             }).catch(err => {
//                 console.log('could not find contacts', err.message);
//             })
//         } else {
//             contact.find({ number: process.argv[3] }).then(contact => {
//                 console.log(contact);
//                 mongoose.connection.close();
//             }).catch(err => {
//                 console.log('could not find contacts', err.message);
//             })
//         }
//     }
// } else {
//     contact.find({}).then(contact => {
//         console.log(contact);
//         mongoose.connection.close();
//     }).catch(err => {
//         console.log('could not find contacts', err.message);
//     })
// }