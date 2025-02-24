const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

///////////////// Creating the tasks //////////////////
router.post('/tasks', auth, async (req, res) => {
    
    const task = new Task({
        //copy all the values from req.body
        ...req.body,
        owner: req.user._id  
    })

    try{ 
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }

    // task.save().then(() =>{
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})


/////////// fetching the tasks ///////////////

// GET /tasks?completed=true

// GET /tasks?Limit=10&skip=

// GET /tasks?sortBy=createdAt:asc

router.get('/tasks', auth, async (req, res) => {    
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 
    }
    try{
        //const tasks = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                skip: parseInt(req.query.skip),
                limit: parseInt(req.query.limit),
                sort

            }
        }).execPopulate()

        res.send(req.user.tasks)
    } catch(e){
        res.status(500).send()
    }
    
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try{
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if(!task)
            return res.status(404).send()

        res.send(task)
    }catch(e) {
        res.status(500).send()
    }
    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        

        
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router