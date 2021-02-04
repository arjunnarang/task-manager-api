const express = require('express')
require('./db/mongoose')

const { findById } = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT


/******************registering middleware********************/
// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')

//     }else{
//          //next() means we're done with the middleware function 
//         next()
//     }

// app.use((req, res, next) => {
    
//         res.status(503).send('Website under maintenance')
        
//  })  
    
// })

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },

//     fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please uplaod a Word doc'))
//         }
//         cb(undefined, true)
        
//     }
// })


// app.post('/upload', upload.single('upload'), (req, res) =>{
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("Server is up on port" + port)
})

// const jwt = require('jsonwebtoken')

// const bcrypt = require('bcryptjs')

// const myFunction = async() => {
//     const token = jwt.sign({ _id: 'wdeddas123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data);
// }

// myFunction()


/*********************how toJSON works******************/
// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function () {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))

// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () => {
//     // const task = await Task.findById('600d95ab2036cf4550a26e5a')

//     // //populate() allows to populate data from a relationship
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('600d958f2036cf4550a26e58')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)


// }

// main()