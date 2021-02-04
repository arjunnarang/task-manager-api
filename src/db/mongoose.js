const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false

})



// const me = new User({
//     name: 'Arjun',
//     age: 20
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

// const me = new User({
//     name: 'John',
//     email: 'mike@gmail.com',
//     password: 'passwor@123'
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })


// const newTask = new Task({
//     description: '  task 1',
//     completed: true
// })

// newTask.save().then((newTask) => {
//     console.log(newTask)
// }).catch((error) => {
//     console.log(error)
// })