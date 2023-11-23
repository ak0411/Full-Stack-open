const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.bqvisnp.mongodb.net/phonebookApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

switch (process.argv.length) {
    case 3:
        Person.find({}).then(result => {
            console.log('phonebook:')
            result.forEach(p => {
                console.log(p.name, p.number)
            })
            mongoose.connection.close()
        })
        break
    case 5:
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })

        person.save().then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook`);
            mongoose.connection.close()
        })
        break
    default:
        console.log('incorrect number of arguments')
    
    process.exit(1)
}